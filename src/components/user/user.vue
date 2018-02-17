<template>
  <div id="library">
    <ul class="row">
      <h3 class="center">Here you can see all your borrowed books.</h3>
      <li v-for="book in books" class="col s6 m4 l3" v-if="logged.name === book.borrowedBy">
        <router-link :to="{name: 'book', params: {id: book.id}}">
          <img :src="book.cover" :alt="book.name" class="responsive-img">
          <button class="waves-effect waves-light btn" @click.prevent="returnBook(book)" v-if="book.borrowedBy === logged.name">return</button>          
          <p>
            <span class="title">{{book.name}}</span></br>
            <span class="author">{{book.author}}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: ''
      }
    },
    computed: {
      books() {
        return this.$store.getters.books;
      },
      logged() {
        return this.$store.getters.logged;
      }
    },
    methods: {
      match_name(book) {
        return book.name.toLowerCase().includes(this.search.toLowerCase());
      },
      match_author(book) {
        return book.author.toLowerCase().includes(this.search.toLowerCase());
      },
      returnBook(book) {
        book.borrowedBy = '';
        this.$store.dispatch('save');
      }
    }
  }
</script>

<style scoped>
  ::placeholder {
    font-weight: 700;
    color: white;
    opacity: 0.8; /* Firefox */
    text-shadow: 0 0 5px black;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    font-weight: 700;
    color: white;
    text-shadow: 0 0 5px black;
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    font-weight: 700;
    color: white;
    text-shadow: 0 0 5px black;;
  }

  input {
    font-weight: 700;
    color: white;
    text-shadow: 0 0 5px black;
  }

  li {
    background-color: rgba(255,255,255,0.3);
    text-align: justify;
    overflow-y: hidden;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 5px;
    height: 380px;
    padding-bottom: 50px;
  }

  p {
    color: #2c3e50;
    text-align: center;
    margin: 8px 0 -3px;
  }

  .status {
    text-transform: uppercase;
    border-radius: 2px;
    padding: 1px 6px;
  }
  
  .title {
    font-size: 1.25em;
  }

  .author {
    font-style: italic;
  }

  .responsive-img {
    height: 230px;
    display: block;
    margin: auto;
    padding-top: 15px;
  }

  button {
    display: block;
    margin: 5px auto 0;
  }
</style>