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
      <textarea required v-model="value"></textarea>
      <button :class="$style.submit_button" type="submit">回答</button>
    </form>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";
import clickSound from "~/assets/sound/laugh.mp3";

export default {
  data() {
    const value = "";
    return {
      value
    };
  },

  async asyncData(context) {
    console.log(context.route);
    const theme = await firebase
      .firestore()
      .collection("theme")
      .doc(context.route.params.id)
      .get()
      .then(doc => {
        return doc.data();
      });

    const contents = theme.content;
    const comments = theme.comments;

    return {
      contents,
      comments,
      theme
    };
  },
  methods: {
    // いいね数を増やす
    counter(index) {
      console.log(index);
      const audio = new Audio(clickSound);
      const newDate = { ...this.theme };
      audio.play();
      newDate.comments[index].good_count += 1;
      firebase
        .firestore()
        .collection("theme")
        .doc(this.$route.params.id)
        .set(newDate, { merge: true });
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
          this.value = "";
          this.comments.push(commentData);
        });
    }
  }
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
  font: normal normal bold 12px Yu Gothic;
  color: #1492e6;
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