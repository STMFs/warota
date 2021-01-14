<template>
    <div>
        <header>
            <h1>worota</h1>
            <div class="login_button" @click="Login()">ログイン</div>
            <div class="post_button" @click="Route_post()">お題投稿</div>
            <!--<div class="User_confirm" @click="IsUser()">ユーザー確認</div>-->
        </header>
    </div>
</template>

<script>
import firebase from "@/plugins/firebase.js"
export default {
  methods: {
    Login() {
      firebase.auth().onAuthStateChanged(function(user){
        console.log(user);
        if(user) {  //既にログインしているとき
          console.log('already logined')
        }else{  //未ログイン時
          console.log('Not logined')
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
      })
    },

    Route_post() {
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          this.$router.push("/post")
        }
      })
    },
/*
    IsUser() {
      firebase.auth().onAuthStateChanged(function(user){

      })
    }
*/
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

.route_post{
    width: 80px;
    height: 30px;
    border: 1px solid #000;
    border-radius: 4px;
    opacity: 1;
}
</style>