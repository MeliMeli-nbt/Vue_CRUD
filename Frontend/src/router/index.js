import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import Home from '../views/Home.vue';
import BoardEmployee from '../views/BoardEmployee.vue';
import DashBoard from '../views/DashBoard.vue';
import BoardAccount from '../views/BoardAccount.vue';
import LogIn from '../views/LogIn.vue';
import ContentHome from '../views/ContentHome.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'ContentHome',
        component: ContentHome
      },
      {
        path: 'login',
        name: 'LogIn',
        component: LogIn
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoard,
    children: [
      {
        path: 'boardEmployee',
        name: 'BoardEmployee',
        component: BoardEmployee
      },
      {
        path: 'boardAccount',
        name: 'BoardAccount',
        component: BoardAccount,
        meta: {
            requireAdmin: true
        }
      }
    ],
    meta: {
        requireLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requireLogin = to.matched.some(record => record.meta.requireLogin);
  const isAuthenticated = store.state.isAuthenticated;

  if (requireLogin && !isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    const requireAdmin = to.matched.some(record => record.meta.requireAdmin);
    const isAuthenAdmin = store.state.isAuthenAdmin;

    if (requireAdmin && !isAuthenAdmin) { 
      next({ name: 'BoardAccount' });
    } else {
      next(); 
    }
  }
});

export default router;
