<template>
    <div>
        <header :class="$style.header">
            <div :class="$style.title">worota</div>
            <div :class="$style.buttons">
              <button :class="$style.hbutton" @click="login()">ログイン</button>
              <button :class="$style.hbutton" @click="route_post()">お題投稿</button>
            </div>
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
    },
    route_post() {
        this.$router.push("/post")
    }
  }
}
</script>

<style lang="scss" module>
.header {
  width: 100vw;
  height:6vh;
  background: white 0% 0% no-repeat padding-box;
  display: table-cell;
  vertical-align:middle;
}
.buttons{
  display: inline-block;
  float: right;
  margin-right: 5vw;
}
.hbutton {
    width: 80px;
    height: 30px;
    border: 1px solid #000;
    border-radius: 4px;
    text-align:center;
    font: normal normal bold 15px/24px Yu Gothic;
    display: inline-block;
    background: white 0% 0% no-repeat padding-box;
    margin-right:10px;
}
.title {
  font: normal normal bold 20px/30px Meiryo;
  display: inline-block;
  margin-left:10px;
}

</style>