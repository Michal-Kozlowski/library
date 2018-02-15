<template>
  <div id="book">
    <div class="book">
      <img :src="books[id].cover" :alt="books[id].name" class="responsive-img">
      <p>
        <span class="title">{{books[id].name}}</span></br>
        <span class="author">{{books[id].author}}</span>
      </p>
      <p class="description">{{books[id].description}}</p>
      <button class="waves-effect waves-light btn" @click.prevent="borrow(books[id])" v-if="books[id].borrowedBy === ''">Borrow</button>
      <button class="waves-effect waves-light btn disabled" v-else>Borrowed</button>
      <router-link to="/library" class="blue-text text-darken-2">Back to The Library</span></router-link>
      <div class="right">
        <i 
          v-for="(star, index) in 5" 
          @click="rate(index)" 
          :class="{rate:index < Math.round(books[id].rate.sum/books[id].rate.voters.length)}" 
          class="material-icons">star
        </i>
      </div>
    </div>
    <ul>
      <li class="comment" v-for="(comment, index) in comments" v-if="match_id(comment)">
        {{comment.text}} - <span class="author">{{comment.author}}</span>
        <button v-if="logged.name === comment.author" @click="deleteComment(index)" class="waves-effect waves-light btn">delete</button>
      </li>
    </ul>
    <form v-show="logged.name !== ''">
      <input type="text" name="comment" v-model="comment">
      <button class="waves-effect waves-light btn" @click.prevent="addComment()">Add comment</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        comment: ''
      }
    },
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
          this.$store.dispatch('save');
          this.$store.getters.router.push('/Library');
        }
      },
      addComment() {
        const commentData = {
          text: this.comment,
          bookID: this.$route.params.id
        }
        this.$store.dispatch('comment', commentData);
        this.$store.dispatch('save');
        this.comment = '';
      },
      deleteComment(index) {
        this.$store.dispatch('deleteComment', index);
        this.$store.dispatch('save');
      },
      rate(index) {
        if(this.logged.name){
          if(!this.books[this.id].rate.voters.includes(this.logged.name)) { 
            const vote = {
              value: index,
              id: this.id
            }  
            this.$store.dispatch('rate', vote);
            this.$store.dispatch('save');
          } else {
            alert("You have already rated this book!");
          }          
        } else {
          alert("You have to log in to do that!"); 
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .book, .comment {
    background-color: rgba(255,255,255,0.3);
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 5px;
    margin-top: 1%;
    padding: 2% 10%;
  }

  h1, p {
    text-align: center;
  }

  .title {
    font-size: 1.5em;
    font-weight: bold;
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
    box-shadow: 8px 8px 12px black;
  }

  button {
    display: block;
    margin: auto;
  }

  form {
    margin-bottom: 20px;
  }

  i {
    font-size: 1.2em;
    margin-top: 6px;
    cursor: pointer;
    &:hover {
      font-size: 1.4em;
      color: gold;
      margin-top: 3px;
      text-shadow: 0 0 25px black, 0 0 10px black, 0 0 4px white, 1px 2px 1px black;
    }
  }

  .rate {
    color: gold;
    text-shadow: 0 0 25px black, 0 0 10px black, 0 0 4px white, 1px 2px 1px black;
  }
</style>