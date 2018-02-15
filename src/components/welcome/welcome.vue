<template>
  <div id="welcome">
    <h1>Welcome to The Library</h1>
    <p>You have found the best place to borrow books from</p>
    <div class="row">
      <router-link to="/signup" class="blue-text text-darken-2 offset-m3 col m2 s3">Sign Up</router-link>
      <router-link to="/signin" class="blue-text text-darken-2 col m2 s3">Sign In</router-link>
      <router-link to="/library" class="blue-text text-darken-2 col l3 m3 s6">...or just look</router-link>
    </div>
  </div>
</template>

<style scoped>
	#welcome {
		text-align: center;
		margin-top: 20%;
	}

	h1 {
		font-weight: bold;
		text-shadow: 0 0 10px white, 0 0 25px white, 0 0 50px white;
	}

	.blue-text {
		font-weight: bold;
	}
</style>