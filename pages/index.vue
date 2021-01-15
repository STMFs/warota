<template>
  <div class="theme_page">
    <div>
      <li v-for="theme in themes" :key="theme.content">
        <div class="theme"> {{ theme.content }} </div>
        <!-- TODO ページ遷移に対応させる -->
        <div　class="answer">
          <a href="#">お題への回答を見る</a>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase.js";

export default {
  data() {
    const value = "";
    const count = 0;
    return {
      value
    };
  },

  async asyncData(context) {
    // console.log(context.route.params);
    // asyncDataという名前はあまり気にしないでください。
    const themes = await firebase
      .firestore() // サービスを選択（他には .auth() など）
      .collection("theme")
      .get() // 読み取り （他には .set() .update() などがある）
      .then(collection => {
        // console.log(Array.isArray(collection.docs)); // objectの配列
        return collection.docs.map( doc => {
          return doc.data();
        });
      });
    // console.log("themes", themes);

    return {
      themes
    };
  },
};
</script>

<style>
/* TODO CSS 書く */

li {
  list-style: none;
}

a {
  color: black;
  text-decoration: none;
}

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

.theme {
  display: flex;
  height: 100px;
  width: 100%;
  background:#FFD857 0% 0%;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.theme_page{
  margin-top: 3vh;
}

.answer {
  display: flex;
  width: 100%;
  height: 50px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
