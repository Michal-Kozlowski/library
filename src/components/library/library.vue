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
      <li v-for="book in books" class="col s6 m4 l3" v-if="match_name(book) || match_author(book)">
        <router-link :to="{name: 'book', params: {id: book.id}}">
          <p><i 
            v-for="(star, index) in 5"
            @mouseover="starsHover(index, book.id)"
            @mouseleave="starsLeave(index, book.id)"
            :class="{rate:index < Math.round(book.rate.sum/book.rate.voters.length)}"
            @click.prevent="rate(index, book)" 
            class="material-icons">star
          </i></p>
          <img :src="book.cover" :alt="book.name" class="responsive-img">
          <p>
            <span class="status green" v-if="book.borrowedBy === ''">avaliable</span>
            <span class="status blue" v-if="book.borrowedBy === logged.name">borrowed by you</span>
            <span class="status red" v-if="book.borrowedBy !== '' && book.borrowedBy !== logged.name">borrowed</span>
          </p>
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
      logged(){
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
      rate(index, book) {
        if(this.logged.name){
          if(!this.books[book.id-1].rate.voters.includes(this.logged.name)) { 
            const vote = {
              value: index,
              id: book.id-1
            }  
            this.$store.dispatch('rate', vote);
          } else {
            alert("You have already rated this book!");
          }          
        } else {
          alert("You have to log in to do that!"); 
        }
      },
      starsHover(index, id) {
        for(var i=0; i<=index; i++) {
          document.querySelectorAll("i")[(5*(id-1))+index-i].classList.add('starHover');
        }
      },
      starsLeave(index, id) {
        for(var i=0; i<=index; i++) {
          document.querySelectorAll("i")[(5*(id-1))+index-i].classList.remove('starHover');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 5px;
    height: 350px;
    overflow-y: hidden;
    padding-bottom: 50px;
  }

  p {
    line-height: 1.5em;
    text-align: center;
    color: #2c3e50;
    margin: 8px 0 -3px;
  }

  .status {
    text-transform: uppercase;
    border-radius: 2px;
    padding: 1px 6px;
    box-shadow: 2px 2px 10px #000;

  }
  
  .title {
    font-size: 1.25em;
  }

  .author {
    font-style: italic;
  }

  .responsive-img {
    height: 210px;
    display: block;
    margin: auto;
    box-shadow: 2px 2px 10px #000;
  }

  i {
    font-size: 1.2em;
    cursor: pointer;
  }

  .starHover {      
    font-size: 1.4em;
    color: gold;
    margin-top: -3px;
    text-shadow: 0 0 25px black, 0 0 10px black, 0 0 4px white, 1px 2px 1px black;
  }

  .rate {
    color: gold;
    text-shadow: 0 0 25px black, 0 0 10px black, 0 0 4px white, 1px 2px 1px black;
  }
</style>