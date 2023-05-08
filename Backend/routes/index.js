var express = require('express');
var router = express.Router();
const Account = require('../models/account');
const Employee = require('../models/employee');

router.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({
      where: {
        username: username
      }
    });

    if (account && account.password === password) {
      res.status(200).json({ role: account.role });
    } else {
      res.status(401).json({ msg: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/accounts', async(req,res) => {
  const accounts = await Account.findAll();

  res.status(200).json(accounts);
});

router.post('/accounts', async(req, res) => {
  const {username, password} = req.body;

  const newAccount = Account.build({
    'username': username,
    'password': password
  });

  try{
    await newAccount.save();
    res.status(201).json(newAccount);
  }
  catch(err){
    res.json(err);
  }
});

router.get('/accounts/:id', async(req,res) => {
  const account = await Account.findOne({
    where: {
      account_id: req.params.id
    }
  });

  res.status(200).json(account);
});

router.delete('/accounts/:id', async(req, res) => {
  const account = await Account.findOne({
    where: {
      account_id: req.params.id
    }
  });

  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  // delete all employees associated with this account
  await Employee.destroy({
    where: {
      account_id: req.params.id
    }
  });

  // delete the account
  await account.destroy();

  return res.status(204).end();
});


router.get('/employees', async(req,res) => {
  const employees = await Employee.findAll();

  res.status(200).json(employees);
});

router.post('/employees', async(req,res) => {
  const {name, age, gender, address, email, phone, account_id} = req.body;

  const newEmployee = Employee.build({
    'name': name,
    'age': age,
    'gender': gender,
    'email': email,
    'address': address,
    'phone': phone,
    'account_id': account_id
  });

  try{
    await newEmployee.save();
    res.status(201).json(newEmployee);
  }
  catch(err){
    res.json(err);
  }
});

router.get('/employees/:id', async(req,res) => {
  const employee = await Employee.findOne({
    where: {
      id: req.params.id
    }
  });

  res.status(200).json(employee);
});

router.put('/employees/:id', async(req,res) => {
  const employee = await Employee.findOne({
    where: {
      id: req.params.id
    }
  });

  const {name, age, gender, address, email, phone} = req.body;
  await employee.set(
    {
      name: name,
      age: age,
      gender: gender,
      email: email,
      address: address,
      phone: phone
    }
  )

  await employee.save();

  res.status(200).json(employee);

});

router.delete('/employees/:id', async(req,res) => {
  const employee = await Employee.findOne({
    where: {
      id: req.params.id
    }
  });

  await employee.destroy();

  res.status(204).json()
});

module.exports = router;
