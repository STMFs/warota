<template>
  <div>
    <header :class="$style.header">
      <nuxt-link to="/" :class="$style.title">worota</nuxt-link>
      <div :class="$style.buttons">
        <button :class="$style.hbutton" id="login_button" @click="login()">
          ログイン
        </button>
        <button :class="$style.hbutton" @click="$router.push('/post')">
          お題投稿
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";
import { login } from '@/helper/login.js'
export default {
  mounted() {
    const login_button = document.getElementById("login_button");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //ログイン時ログインボタンを非表示
        login_button.style.display = "none";
      }
    });
  },
  methods: {
    login() {
      login();
    },

    Route_post() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          //this.$router.push("/post")
          console.log(user);
        } else {
          alert("googleアカウントでログインしてください");
        }
      });
    }
  }
};
</script>

<style module>
.header {
  width: 100vw;
  height: 6vh;
  background: white 0% 0% no-repeat padding-box;
  display: table-cell;
  vertical-align: middle;
}
.buttons {
  display: inline-block;
  float: right;
  margin-right: 3vw;
}
.hbutton {
  width: auto;
  height: 30px;
  border: 1px solid #000;
  border-radius: 4px;
  text-align: center;
  font: normal normal bold 15px/24px Yu Gothic;
  display: inline-block;
  background: white 0% 0% no-repeat padding-box;
  margin-right: 10px;
}
.title {
  font: normal normal bold 20px/30px Meiryo;
  display: inline-block;
  margin-left: 10px;
}
</style>
