<template>
  <div class="psubmit">
    <h1>お題投稿</h1>
    <form @submit="$event.preventDefault(), themePost()">
      <textarea
        maxlength="50"
        placeholder="50文字以内"
        v-model="value"
        required
      />
      <button class="submit" type="submit">
        投稿
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";

export default {
  data() {
    const value = "";
    return {
      value
    };
  },
  methods: {
    themePost() {
      const user = firebase.auth().currentUser;
      console.log(this.$data.value);
      console.log("user", user);
      const themeData = {
        content: this.value,
        uid: user.uid,
        comments: []
      };
      firebase
        .firestore()
        .collection("theme")
        .doc(user.uid)
        .set(themeData)
        .then(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<style>
.psubmit {
  width: 100vw;
  height: 82vw;
  background: white;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
body {
  -webkit-text-size-adjust: 100%;
  margin-right: auto;
  margin-left: auto;
  background: #f5f5f5 0% 0% no-repeat padding-box;
}
h1 {
  width: 50vw;
  height: 5.1vh;
  margin: 5.8vw 0 5.8vw 5.3vw;
  padding-top: 5.8vw;
  /* font: normal normal bold 35px/56px Yu Gothic; */
  font: normal normal bold 4vh/6.3vh Yu Gothic;
}
form {
  width: 87.5vw;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
textarea {
  top: 18.1vh;
  left: 12.8vw;
  width: 87.5vw;
  height: 32.8vw;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 30px 0px 30px 0px;
}
::placeholder {
  /* 15px 24px */
  /* font: normal normal bold 1.7vh/2.7vh Yu Gothic; */
  font: normal normal bold 4vw/6.4vw Yu Gothic;
  color: #a5a5a5;
  padding-left: 2.6vw;
}
.submit {
  /* font: normal normal bold 1.7vh/2.7vh Yu Gothic; */
  font: normal normal bold 4vw/6.4vw Yu Gothic;
  color: #1492e6;
  /* font-size:15px; */
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #000;
  border-radius: 4px;
  text-align: center;
  width: 21.3vw;
  height: 8vw;
}
</style>
