<template>
  <div>
    <h1>お題投稿</h1>
    <form @submit="$event.preventDefault(), themePost()">
      <input v-model="value" required />
      <button type="submit">投稿</button>
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
      console.log(this.$data.value);

      const themeData = {
        content: this.value
      };
      firebase
        .firestore()
        .collection("theme")
        .doc()
        .set(themeData)
        .then(() => {
          this.value = ""; // input要素の値を空白に
        });
    }
  }
};
</script>

<style></style>
