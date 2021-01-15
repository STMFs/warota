<template>
  <div>
    <div>
      <li v-for="theme in themes" :key="theme.content">
        {{ theme.content }}
        <div>
          <!-- <nuxt-link to="/posts?theme.uid }"> お題への回答を見る</nuxt-link> -->
          <nuxt-link :to="`/posts/` + `${theme.uid}`">
            お題への回答を見る</nuxt-link
          >
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
        return collection.docs.map(doc => {
          return doc.data();
        });
      });
    return {
      themes
    };
  }
};
</script>

<style>
/* TODO CSS 書く */
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
