import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';

import WelcomePage from './components/welcome/welcome.vue';
import SignupPage from './components/auth/signup.vue';
import SigninPage from './components/auth/signin.vue';
import Library from './components/library/library.vue';
import Book from './components/library/book.vue';
import User from './components/user/user.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { path: '/library', component: Library },
  { path: '/library/:id', component: Book },
  { path: '/user', component: User }
];

export default new VueRouter({mode: 'history', routes});