<template>
  <div>
    <!-- お題の内容 -->
    <h1>{{ contents }}</h1>
    <!-- 回答一覧  Good回数 -->
    <div>
      <li v-for="(comment, index) in comments" :key="comment.content">
        {{ comment.content }}
        <button v-on:click="counter(index)">{{ comment.good_count }}</button>
      </li>
    </div>
    <!-- お題の回答 -->
    <form @submit="$event.preventDefault(), postComment()">
      <input v-model="value" />
      <button type="submit">回答</button>
    </form>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";

export default {
  data() {
    const value = "";
    // const count = 0;
    return {
      value
    };
  },

  async asyncData(context) {
    console.log(context.route);
    // asyncDataという名前はあまり気にしないでください。
    const theme = await firebase
      .firestore() // サービスを選択（他には .auth() など）
      .collection("theme")
      .doc(context.route.params.id) // themeの中のキー（ドキュメント）を持ったデータを
      .get() // 読み取り （他には .set() .update() などがある）
      .then(doc => {
        // docという引数には直前までの処理結果が入っている
        // then は直前までの処理が成功したら実行される
        return doc.data(); // データ形式を変換してるイメージ
      });
    console.log("theme", theme);

    const contents = theme.content;
    const comments = theme.comments;

    console.log(comments);
    return {
      contents, // ここでreturnした変数は上の<template>の中で使える
      comments,
      theme
    };
  },
  methods: {
    // いいね数を増やす
    counter(index) {
      console.log(index);

      const newOata = { ...this.theme }; // 参照でなくデータだけ代入できる
      newOata.comments[index].good_count += 1;
      firebase
        .firestore()
        .collection("theme")
        .doc(this.$route.params.id)
        .set(newOata, { merge: true }); // .$data は省略できる
    },

    postComment() {
      const commentData = {
        content: this.value,
        good_count: 0
      };
      console.log("comments", this.theme.comments);

      firebase
        .firestore()
        .collection("theme")
        .doc(this.$route.params.id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(commentData)
        })
        .then(() => {
          this.value = ""; // input要素の値を空白に
          this.comments.push(commentData); // pushの引数を配列に追加
        });
    }
  }
  // }
};
</script>
