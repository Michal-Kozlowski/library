import Vue from 'vue'
import Vuex from 'vuex'

import books from './components/data/books';

// import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      { name: 'Michał', password: 'password', borrowed: [] },
      { name: 'Monika', password: 'password', borrowed: [] },
      { name: 'Max', password: 'password', borrowed: [] }
    ],
    logged: { name: '', password: ''},
    comments: [
      { bookID: 1, text: "This is the first comment" , author: "M"},
      { bookID: 1, text: "This is the second comment" , author: "MM"},
      { bookID: 1, text: "This is the third comment" , author: "MMM"},
      { bookID: 2, text: "This is the fourth comment" , author: "MMMM"},
      { bookID: 3, text: "This is the fifth comment" , author: "MMMMM"}
    ],
    rating: [],

  },
  mutations: {
    LOGIN(state, formData) {
      this.state.users.forEach((user) => {
        if(user.name === formData.name && user.password === formData.password){          
          this.state.logged.name = formData.name;
          this.state.logged.password = formData.password;
        }
      });
    },
    SIGNUP(state, formData) {     
      this.state.logged.name = formData.name;
      this.state.logged.password = formData.password;
      this.state.users.push({name: formData.name, password: formData.password, borrowed: []});
    },
    LOGOUT(state) {
      this.state.logged.name = '';
      this.state.logged.password = '';
    }
  },
  actions: {
    login({commit}, formData) {
      commit('LOGIN', formData);
    },
    signup({commit}, formData) {
      commit('SIGNUP', formData);
    },
    logout({commit}) {
      commit('LOGOUT');
    }
  },
  getters: {
    books() {
      return books;
    },
    users: state => {
      return state.users;
    },
    logged: state => {
      return state.logged;
    },
    comments: state => {
      return state.comments;
    },
    isAuthenticated: state => {
      if(state.logged.name) {
        return true;
      } else {
        return false;
      }
    }
  }
});	