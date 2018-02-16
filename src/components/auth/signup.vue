<template>
	<form method="POST" action="" v-show="(logged.name === '')">
	    <fieldset>
	    	<legend>Please sign up</legend>
	    	<div :class="{invalid: $v.name.$error}">
          <div class="row">
    		    <i class="material-icons col s2">account_box</i>
            <input class="col s8" type="text" name="name" id="name" placeholder="name" v-model="name" @blur="$v.name.$touch()">           
          </div>
  	      <transition name="slide">
  	    		<p v-if="$v.name.$error">What is your name?</p>
  	    	</transition>
		    </div>
		    <div :class="{invalid: $v.password.$error}">
          <div class="row">
            <i class="material-icons col s2">lock_outline</i>
            <input class="col s8" type="password" name="password" id="password" placeholder="password" v-model="password" @blur="$v.password.$touch()">
          </div>
  		    <transition name="slide">
  					<p v-if="$v.password.$error">Password must be at least 6 letters long</p>
  				</transition>
        </div>
		    <div class="row">
          <i class="material-icons col s4">assignment_turned_in</i>
		      <button class="waves-effect waves-light blue lighten-1 btn-large" type="submit" :disabled="$v.$invalid" @click.prevent="[$v.name.$touch(), $v.password.$touch(), submit()]">login</button>
		    </div>
	    </fieldset> 
	</form>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators';

export default {
	data () {
		return {
			name: '',
			password: ''
		}
	},
	validations: {
		name: {
			required,
		},
		password: {
			required,
			minLen: minLength(6)
		}
	},
	computed: {
    logged(){
      return this.$store.getters.logged;
    }
  },
  methods: {
    submit() {
      let check = false;
      this.$store.getters.users.forEach((user) => {
        if(user.name === this.name){          
          check = true;
        }
      });
      if(!check) {        
        const formData = {
          name: this.name,
          password: this.password
        }
        this.$store.dispatch('signup', formData);
        this.$store.dispatch('save');
        this.$store.getters.router.push('/library');
      } else {
        alert("Name already in use");
      }
    }
  }
}
</script>

<style scoped>
  fieldset {
    background-color: rgba(0,0,0,0.7);
  	max-width: 400px;
  	border-radius: 5px;
    margin: 0 auto;
  	box-shadow: 0 0 30px 2px black;
  }

  legend {
  	font-size: 2em;
    text-align: center;
  	text-shadow: 0 0 20px white, 0 0 10px white;
  }

  div:not(:last-child) {
  	margin-top: 20px;
  	margin-bottom: 20px;
  }

  input {
  	font-size: 1.1em;
  	color: white;
    width: 90%;
    border-radius: 5px;
  }

  label {
  	text-transform: capitalize;
    display: block;
  	margin-bottom: 4px;
  	text-shadow: 0 0 5px black;
  }

  .material-icons {
  	font-size: 2em;
    color: white;
    padding-left: 18px;
  	transform: translateY(12px);
  }

  input[type="submit"] {
    color: black;
  	text-transform: capitalize;
  	cursor: pointer;
    width: 120px;
    margin-bottom: 20px;
  }

  p {
  	font-size: 0.8em;
    color: white;
  	max-width: 80%;
  	padding-left: 25px;
  	margin: 2px auto 0;
  }

  .invalid label {
    color: red;
  }

  .invalid input {
    background-color: $ffc9aa;
    border: 2px solid red;
  }

  .invalid input {
  	animation: shake .5s;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }

  .slide-leave-active {
    animation: slide-out .5s;
    transition: opacity .2s;
    opacity: 1;
  }

  .slide-leave {
    opacity: 0;
  }

  @keyframes slide-out {
    from {
      transform: translateY(0) scaleY(1);
    }
    to {
      transform: translateY(-25px) scaleY(0);
    }
  }

  @media only screen and (min-height: 768px) {
    fieldset {
  	  margin: 10vh auto 0;
  	}
  }
</style>