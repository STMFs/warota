<template>
  <div>
    <button @click="addTestData()">テストデータ追加</button>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";
export default {
  methods: {
    addTestData() {
      const testData = {
        content: "お題",
        userId: "お題 user_id",
        comments: [
          {
            content: "コメント",
            userId: "コメント user_id",
            goodCount: 3,
          },
        ],
      };
      firebase.firestore().collection("theme").doc().set(testData);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>