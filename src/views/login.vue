<template>
    <div id="login-form">
        <img id="login-img" src="../assets/login.svg">
        <h3> Please login with your Google account to continue</h3>
        <button id="login-button" @click="login"> Login with google </button>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    methods: {
        login() {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

            firebase.auth().signInWithPopup(provider).then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                this.$router.push('/')
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    }
}
</script>

<style scoped>
  #login-form{
    background-color: #292929;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(18,18,18,1);
    transition: box-shadow .3s;
    color: #fff;

position: absolute;
  width: 50%;
  height: 50%;
  z-index: 15;
  top: 50%;
  left: 50%;
  margin: -12.5% 0 0 -25%;
  padding-bottom: 150px;
  }

  #login-form:hover{
    box-shadow: 0px 0px 15px 0px rgba(18,18,18,1);
  }

  h3{
      margin: 50px;
  }

  #login-img{
    display: block;
margin-left: auto;
margin-right: auto;
   height: 50%;
   width: 50%;
   margin-top: 50px;
   margin-bottom: 50px;
  }

#login-button{
    background-color: #fff;
    color: #000;
    padding: 15px;
    border: 0px;
    border-radius: 50px;

    box-shadow: 0px 0px 10px 0px rgb(63, 63, 63);
    transition: box-shadow .3s;
}

#login-button:hover{
        box-shadow: 0px 0px 20px 0px rgba(63, 63, 63);
}
</style>
