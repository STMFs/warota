<template>
    <div>
        <header>
            <h1>worota</h1>
            <div class="login_button" @click="login()">ログイン</div>
        </header>
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
.login_button{
    width: 80px;
    height: 30px;
    border: 1px solid #000;
    border-radius: 4px;
    opacity: 1;
}
</style>