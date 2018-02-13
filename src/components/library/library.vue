<template>
  <div id="library">
    <div class="row">
      <div class="input-field col s8 l4 offset-s2 offset-l4">
        <form>
          <input type="text" name="search" placeholder="Search (by title or author)" v-model="search">
        </form>
      </div>
    </div>
    <ul class="row">
    	<li v-for="book in books" class="col s6 m4 l3 xl2" v-if="match_name(book) || match_author(book)">
        <router-link :to=link(book.id)>
          <img :src="book.cover" :alt="book.name" class="responsive-img">
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
    height: 370px;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 5px;
    background-color: rgba(255,255,255,0.3);
    overflow-y: hidden;
    text-align: justify;
    padding-bottom: 50px;
  }

  h1, p {
    color: #2c3e50;
    text-align: center;
  }
  
  .title {
    font-size: 1.25em;
  }

  .author {
    font-style: italic;
  }

  .responsive-img {
    padding-top: 20px;
    height: 250px;
    display: block;
    margin: auto;
  }
</style>