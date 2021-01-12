<template>
  <div>
    <!-- お題の内容 -->
    <!-- <h1>{{ subject }}</h1> -->
    <!-- 回答一覧 
    <div>{{ getComment }}</div>-->
    <!-- Good回数 
    <button v-on:click="counter += 1">{{ goodCount }}</button>-->
    <!-- お題の回答 -->
    <form @submit="$event.preventDefault(), postComment()">
      <input v-model="value" />
      <button type="submit">回答</button>
    </form>
    <!-- <div>{{ id }}</div> -->
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";

export default {
  data() {
    const value = "";
    return value;
  }
  // computed: {
  //   id() {
  //     const id = this.$route.params.id;
  //     console.log(id);
  //     return id;
  //   }
  // }
  // async asyncData() {
  //   // asyncDataという名前はあまり気にしないでください。
  //   const theme = await firebase
  //     .firestore() // サービスを選択（他には .auth() など）
  //     .collection("theme")
  //     .doc(this.id) // themeの中の'id'というキー（ドキュメント）を持ったデータを
  //     .get() // 読み取り （他には .set() .update() などがある）
  //     .then(doc => {
  //       // docという引数には直前までの処理結果が入っている
  //       // then は直前までの処理が成功したら実行される
  //       return doc.data(); // データ形式を変換してるイメージ
  //     });
  //   console.log("theme", theme);

  //   const subject = theme.content;
  //   return {
  //     subject // ここでreturnした変数は上の<template>の中で使える
  //   };
  // }
};
</script>
