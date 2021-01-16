<template>
  <div :class="$style.answer_page">
    <!-- お題の内容 -->
    <h1 :class="$style.theme">{{ contents }}</h1>
    <!-- 回答一覧  Good回数 -->
      <li :class="$style.comment" v-for="(comment, index) in comments" :key="comment.content">
        <div :class="$style.comment_content">{{ comment.content }}</div>
        <div :class="$style.good_button">
          <img src="@/assets/images/good_button.png" v-on:click="counter(index)">
          <div :class="$style.good_count">{{ comment.good_count }}</div>
        </div>
      </li>
    <!-- お題の回答 -->
    <form :class="$style.answer_submit" @submit="$event.preventDefault(), postComment()">
      <textarea v-model="value"></textarea>
      <button :class="$style.submit_button" type="submit">回答</button>
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

<style module>

textarea{
  width: 60%;
  height: 8vh;
}

img{
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.answer_page {
  margin-top: 3vh;
}

.theme {
  display: flex;
  height: 12.5vh;
  width: 100%;
  margin-bottom: 3vh;
  background: #ffd857 0% 0%;
  font: normal normal bold 4.8vw/7.7vw Yu Gothic;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.comment {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.answer_submit{
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit_button{
  /* font: normal normal bold 1.7vh/2.7vh Yu Gothic; */
  font: normal normal bold 15px Yu Gothic;
  color: #1492e6;
  /* font-size:15px; */
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #000;
  border-radius: 4px;
  width: 15%;
  height: 3.5vh;
  margin-top: 2vh;
}

.good_button{
  display: flex;
  flex-direction: row;
}

.comment_content{
  margin-left: 40px;

}

.good_count{
  margin-top: 12px;
  margin-right: 20px;
  display: flex;
  font-weight: bold;
}
</style>