<template>
  <div>
    <div>ページのid: {{ id }}</div>
    <div>お題: {{ name }}</div>
    <!-- <div>ユーザー名: {{ userName }}</div> -->
    <!-- ↑ 表示してみて！ -->

    <!-- お題の変更 -->
    <form @submit="$event.preventDefault(), changeName()">
      <input v-model="value" />
      <button type="submit">変更</button>
    </form>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";

export default {
  data() {
    const value = "";
    return {
      value,
    };
  },
  computed: {
    id() {
      const id = this.$route.params.id;
      return id;
    },
  },
  async asyncData() {
    // asyncDataという名前はあまり気にしないでください。
    const theme = await firebase
      .firestore() // サービスを選択（他には .auth() など）
      .collection("theme")
      .doc("id") // themeの中の'id'というキー（ドキュメント）を持ったデータを
      .get() // 読み取り （他には .set() .update() などがある）
      .then((doc) => {
        // docという引数には直前までの処理結果が入っている
        // then は直前までの処理が成功したら実行される
        return doc.data(); // データ形式を変換してるイメージ
      });
    console.log("theme", theme);

    const name = theme.content;
    return {
      name, // ここでreturnした変数は上の<template>の中で使える
    };
  },

  methods: {
    // お題を変更
    changeName() {
      console.log(this.$data.value);

      firebase
        .firestore()
        .collection("theme")
        .doc("id")
        .set({ content: this.value }, { merge: true }) // .$data は省略できる
        .then(() => {
          this.name = this.value; // input要素の値を代入
          this.value = ""; // input要素の値を空白に
        });
    },
  },
};
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
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

.links {
  padding-top: 15px;
}
</style>
