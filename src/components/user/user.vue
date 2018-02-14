<template>
  <div id="library">
    <ul class="row">
    	<li v-for="book in books" class="col s6 m4 l3" v-if="logged.name === book.borrowedBy">
        <router-link :to="link(book.id)">
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
      link(id) {
        return "/library/" + id;
      },
      match_name(book) {
        return book.name.toLowerCase().includes(this.search.toLowerCase());
      },
      match_author(book) {
        return book.author.toLowerCase().includes(this.search.toLowerCase());
      },
      returnBook(book) {
        book.borrowedBy = '';
        this.$store.getters.router.push('/Library');
      }
    }
  }
</script>

<style scoped>
  ::placeholder {
    font-weight: 700;
    color: white;
    text-shadow: 0 0 5px black;
    opacity: 0.8; /* Firefox */
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
    height: 380px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 5px;
    background-color: rgba(255,255,255,0.3);
    overflow-y: hidden;
    text-align: justify;
    padding-bottom: 50px;
  }

  p {
    margin: 8px 0 -3px;
    color: #2c3e50;
    text-align: center;
  }

  .status {
    border-radius: 2px;
    padding: 1px 6px;
    text-transform: uppercase;
  }
  
  .title {
    font-size: 1.25em;
  }

  .author {
    font-style: italic;
  }

  .responsive-img {
    padding-top: 15px;
    height: 230px;
    display: block;
    margin: auto;
  }

  button {
    display: block;
    margin: 5px auto 0;
  }
</style>