import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

// Initialize Firebase

require("firebase/firestore");

var config = {
  apiKey: "AIzaSyBYiRVZZYbWNS9WxtpTzpV3DsXPXCxU-Z4",
  authDomain: "vuechat-9e695.firebaseapp.com",
  databaseURL: "https://vuechat-9e695.firebaseio.com",
  projectId: "vuechat-9e695",
  storageBucket: "vuechat-9e695.appspot.com",
  messagingSenderId: "725471767589"
};
firebase.initializeApp(config);

var db = firebase.firestore();

window.db = db;

//Disable deprecated features (no warnings in console)
db.settings({
  timestampsInSnapshots: true
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
