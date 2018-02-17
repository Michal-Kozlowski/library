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

// -----------(no github pages)------------
//###### this lines are here for normal use
//###### comment them out for githubpages
const routes = [
  { path: '', name: 'welcome', component: WelcomePage },
  { path: '/signup', name: 'signup', component: SignupPage },
  { path: '/signin', name: 'signin', component: SigninPage },
  { path: '/library', name: 'library', component: Library },
  { path: '/library/:id', name: 'book', component: Book },
  { path: '/user', name: 'user', component: User }
];

// -----------(github pages)-------------
//###### these lines are here only in order for github pages to work
//###### they should be commented out for normal app use
// const routes = [
//   { path: '/library', name: 'welcome', component: WelcomePage },
//   { path: '/library/signup', name: 'signup', component: SignupPage },
//   { path: '/library/signin', name: 'signin', component: SigninPage },
//   { path: '/library/library', name: 'library', component: Library },
//   { path: '/library/library/:id', name: 'book', component: Book },
//   { path: '/library/user', name: 'user', component: User }
// ];

export default new VueRouter({mode: 'history', routes});