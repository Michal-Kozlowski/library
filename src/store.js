import Vue from 'vue';
import Vuex from 'vuex';

import books from './components/data/books';

import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books,
    users: [
      { name: 'Michał', password: 'password'},
      { name: 'Monika', password: 'password'},
      { name: 'Max', password: 'password'}
    ],
    logged: { name: '', password: ''},
    comments: [
      { bookID: 1, text: "This is the first comment" , author: "M" },
      { bookID: 1, text: "This is the second comment" , author: "MM" },
      { bookID: 1, text: "This is the third comment" , author: "MMM" },
      { bookID: 2, text: "This is the fourth comment" , author: "MMMM" },
      { bookID: 3, text: "This is the fifth comment" , author: "MMMMM" }
    ]
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
      this.state.users.push({name: formData.name, password: formData.password});
    },
    LOGOUT(state) {
      this.state.logged.name = '';
      this.state.logged.password = '';
    },
    COMMENT(state, commentData) {
      this.state.comments.push({bookID: commentData.bookID, text: commentData.text , author: this.state.logged.name});
    },
    DELETE_COMMENT(state, index) {
      this.state.comments.splice(index, 1);
    },
    RATE(state, vote) {
      this.state.books[vote.id].rate.sum += vote.value + 1;
      this.state.books[vote.id].rate.voters.push(this.state.logged.name);
    },
    SAVE_DATA(state) {
      localStorage.setItem('state', JSON.stringify(this.state));
    },
    LOAD_DATA(state) {
      const local = localStorage.getItem('state');
      if(local) {       
        this.state.users = JSON.parse(local).users;
        this.state.logged = JSON.parse(local).logged;
        this.state.comments = JSON.parse(local).comments;
        this.state.rating = JSON.parse(local).rating;
        this.state.books = JSON.parse(local).books;
      }
    },
  },
  actions: {
    login({commit}, formData) {
      commit('LOGIN', formData);
    },
    signup({commit}, formData) {
      commit('SIGNUP', formData);;
    },
    logout({commit}) {
      commit('LOGOUT');
    },
    comment({commit}, commentData) {
      commit('COMMENT', commentData);
    },
    deleteComment({commit}, index) {
      commit('DELETE_COMMENT', index);
    },
    rate({commit}, vote) {
      commit('RATE', vote);
    },
    save({commit}) {
      commit('SAVE_DATA');
    },
    load({commit}) {
      commit('LOAD_DATA');
    }
  },
  getters: {
    books: state => {
      return state.books;
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
    },
    router() {
      return router;
    }
  }
});