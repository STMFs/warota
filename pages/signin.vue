<template>
    <div class="container">
    <div>
    <Logo />
    <h1 class="title">
        Ogiri
    </h1>
    <button @click="login()">
      googleアカウントでログイン
    </button>
    </div>
    </div>
</template>

<script>
import firebase from "@/plugins/firebase.js"
export default {
  methods: {
    login() {
      console.log('login')
      const provider = new firebase.auth.GoogleAuthProvider()
      //Fix: サインイン時googleログイン画面にリダイレクトのほうが良さそう？(リダイレクトだとログインに失敗してた)
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken
        var user = result.user
        console.log('success:'+ user)
      }).catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        //var email = error.email
        //var credential = error.credential[
        console.log('login error:'+ errorMessage)
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

</style>
