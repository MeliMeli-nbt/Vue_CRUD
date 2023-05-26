var express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var router = express.Router();
const Account = require("../models/account");
const Employee = require("../models/employee");
const config = require("../config/private");
var { verifyToken } = require("../middleware/verifyToken");
const authorizedRoles = ['admin', 'user'];

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({
      where: {
        username: username,
      },
    });

    if (account) {
      bcrypt.compare(password, account.password).then(function (result) {
        if (result) {
          const payload = {
            username,
            account_id: account.account_id,
            role: account.role,
          };
          const token = jwt.sign(payload, config.privateKey, {
            expiresIn: config.expiresIn,
          });
          res.status(200).json({ token });
        } else {
          res.status(401).json({ msg: "Invalid password" });
        }
      });
    } else {
      res.status(401).json({ msg: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/authAdmin", verifyToken, (req, res) => {
  try {
    let user = req.user;
    const formData = {
      username: user.username,
      account_id: user.account_id,
      role: user.role
    }
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server" });
  }
});


router.get("/accounts", verifyToken, async (req, res) => {
  try {
    let currentUser = req.user;
    if (currentUser.role === 'admin') {
      const accounts = await Account.findAll();
      res.status(200).json(accounts);
    }
    else {
      res.status(500).json({ message: "You are not admin" }); s
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/accounts", verifyToken, async (req, res) => {
  const { username, password } = req.body;
  try {
    let currentUser = req.user;
    if (currentUser.role === "admin") {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newAccount = await Account.build({
        username: username,
        password: hash,
      }).save();
      const account = await Account.findOne({
        where: {
          username: username
        },
      });
      res.status(201).json(account);
    }
    else {
      res.status(500).json({ message: "You are not admin" });
    }
  } catch (err) {
    res.json(err);
  }
});

router.get("/accounts/:id", verifyToken, async (req, res) => {
  try {
    let currentUser = req.user;
    if (currentUser.role === 'admin') {
      const account = await Account.findOne({
        where: {
          account_id: req.params.id,
        },
      });
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    }
    else {
      res.status(500).json({ message: "You are not Admin" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/editRole/:id", verifyToken, async (req, res) => {
  let currentUser = req.user;
  if (currentUser.role === 'admin') {
  const account = await Account.findOne({
    where: { account_id: req.params.id },
  });

  if (!account) {
    return res.status(404).send('Account not found');
  }

  const { role } = req.body;

    try {
      if (role) {
        await account.update({ role });
      }

      return res.status(200).json({ msg: "Role updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  }
  else {
    res.status(500).json({ msg: "You are not Admin" });
  }
});

router.put("/changePassword/:id", verifyToken, async (req, res) => {
  try {
    let currentUser = req.user;
    let username = req.body.username;
    if (authorizedRoles.includes(currentUser.role) && currentUser.username === username) {
      const account = await Account.findOne({
        where: { account_id: req.params.id },
      });

      if (!account) {
        return res.status(404).json({ msg: 'Account not found' });
      }

      const { crPass, newPass } = req.body;

      const result = await bcrypt.compare(crPass, account.password);

      if (result) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPass, salt);
        await account.update({ password });
        res.status(200).json({ msg: "Password is updated" });
      } else {
        res.status(401).json({ msg: "Invalid password" });
      }
    }
    else {
      res.status(500).json({ msg: "You are not authenticated" });
    }
  } catch (err) {
    res.status(500).json('Server Error');
  };
});


router.delete("/accounts/:id", verifyToken, async (req, res) => {
  try {
    let currentUser = req.user;
    if (currentUser.role === "admin") {
      const account = await Account.findOne({
        where: {
          account_id: req.params.id,
        },
      });

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      await Employee.destroy({
        where: {
          account_id: req.params.id,
        },
      });

      await account.destroy();

      return res.status(204).end();
    }
    else {
      res.status(500).json({ message: "You are not authenticated" });
    }

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/employees", verifyToken, async (req, res) => {
  try {
    let currentUser = req.user;
    if (authorizedRoles.includes(currentUser.role)) {
      const employees = await Employee.findAll();
      res.status(200).json(employees);
    }
    else {
      res.status(500).json({ message: "You are not authenticated" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/employees", verifyToken, async (req, res) => {
  let currentUser = req.user;
  if (authorizedRoles.includes(currentUser.role)) {
    const { name, age, gender, address, email, phone, account_id } = req.body;

    if (!name || !age || !gender || !email || !phone || !account_id) {
      res.status(400).json({ msg: "Missing required fields" });
      return;
    }

    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      res.status(409).json({ msg: "Email is already in use" });
      return;
    }

    const newEmployee = Employee.build({
      name,
      age,
      gender,
      email,
      address,
      phone,
      account_id,
    });

    try {
      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
  else {
    res.status(500).json({ msg: "You are not authenticated" })
  }
});


router.get("/employees/:id", verifyToken, async (req, res) => {
  let currentUser = req.user;
  if (authorizedRoles.includes(currentUser.role)) {
    const employee = await Employee.findOne({
      where: {
        account_id: req.params.id,
      },
    });

    res.status(200).json(employee);
  }
  else {
    res.status(500).json({ msg: "You are not authenticated" })
  }
});

router.get("/edit/:id", verifyToken, async (req, res) => {
  let currentUser = req.user;
  if (authorizedRoles.includes(currentUser.role)) {
    const employee = await Employee.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(employee);
  }
  else {
    res.status(500).json({ msg: "You are not authenticated" });
  }
});

router.put("/admin/employees/:id", verifyToken, async (req, res) => {
  try {
    let currentUser = req.user;
    if (currentUser.role === "admin") {
      const employee = await Employee.findOne({
        where: {
          id: req.params.id,
        },
      });

      const { name, age, gender, address, email, phone } = req.body;
      await employee.set({
        name: name,
        age: age,
        gender: gender,
        email: email,
        address: address,
        phone: phone,
      });
      await employee.save();
      res.status(200).json(employee);
    }
    else {
      res.status(500).json({ message: 'You are not authorized to update employee records.' });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/user/employees/:id", verifyToken, async (req, res) => {
  try {
    let currentUser = req.user;
    if (currentUser.role === 'user') {
      const employee = await Employee.findOne({
        where: {
          id: req.params.id,
        },
      });

      const { name, age, gender, address, email, phone } = req.body;
      await employee.set({
        name: name,
        age: age,
        gender: gender,
        email: email,
        address: address,
        phone: phone,
      });
      await employee.save();
      res.status(200).json(employee);
    }
    else {
      res.status(500).json({ message: 'You are not authorized to update employee records.' });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/employees/:id", verifyToken, async (req, res) => {
  let currentUser = req.user;
  if (authorizedRoles.includes(currentUser.role)) {
    const employee = await Employee.findOne({
      where: {
        id: req.params.id,
      },
    });

    await employee.destroy();

    res.status(204).json();
  }
  else {
    res.status(500).json({ message: 'You are not authorized' });
  }
});

module.exports = router;
