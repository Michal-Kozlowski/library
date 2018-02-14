<template>
  <header id="header">
    <nav>
      <div class="nav-wrapper blue lighten-2">
        <router-link to="/library" class="brand-logo">The Library</span></router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="!auth">
            <router-link to="/signup">Sign Up</router-link>
          </li>
          <li v-if="!auth">
            <router-link to="/signin">Sign In</router-link>
          </li>
          <li v-if="auth">
             <router-link to="/user">Welcome {{logged.name}} :)</router-link>
          </li>
          <li v-if="auth" @click="onLogout">
            <router-link to="/">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated;
      },
      users() {
        return this.$store.getters.users;
      },
      logged() {
        return this.$store.getters.logged;
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');

      }
    }
  }
</script>

<style scoped>
  .brand-logo {
    margin-left: 10px;
  }
</style>