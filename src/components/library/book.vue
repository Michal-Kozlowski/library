<template>
  <div id="book">
    <div class="book">
      <img :src="books[id].cover" :alt="books[id].name" class="responsive-img">
      <p>
        <span class="title">{{books[id].name}}</span></br>
        <span class="author">{{books[id].author}}</span>
      </p>
      <p class="description">{{books[id].description}}</p>
      <router-link to="/library">Back to The Library</span></router-link>
      <button class="waves-effect waves-light btn" @click.prevent="borrow(books[id])" v-if="books[id].borrowedBy === ''">Borrow</button>
      <button class="waves-effect waves-light btn disabled" v-else>Borrowed</button>
    </div>
    <ul>
      <li class="comment" v-for="comment in comments" v-if="match_id(comment)">{{comment.text}} - <i>{{comment.author}}</i></li>
    </ul>
  </div>
</template>

<script>
  export default {
    computed: {
      books() {
        return this.$store.getters.books;
      },
      id() {
        return this.$route.params.id-1;
      },
      comments() {
        return this.$store.getters.comments;
      },
      logged(){
        return this.$store.getters.logged;
      }
    },
    methods: {
      match_id(comment) {
        return comment.bookID == this.$route.params.id;
      },
      borrow(book) {
        if(this.logged.name === '') {
          alert("You need to log in to borrow books!");
        } else {
          book.borrowedBy = this.logged.name;
          this.$store.getters.router.push('/Library');
        }
      }
    }
  }
</script>

<style scoped>
  .book, .comment {
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 5px;
    background-color: rgba(255,255,255,0.3);
    margin-top: 1%;
    padding: 2% 10%;
  }

  h1, p {
    text-align: center;
  }

  .title {
    font-weight: bold;
    font-size: 1.5em;
  }

  .author {
    font-style: italic;
  }

  .description {
    text-align: justify;
  }

  .responsive-img {
    max-height: 450px;
    display: block;
    margin: auto;
  }

  button {
    float: right;
  }
</style>