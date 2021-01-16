<template>
  <div :class="$style.theme_page">
    <div>
      <li v-for="theme in themes" :key="theme.content">
        <nuxt-link :to="`/posts/${theme.id}`" :class="$style.theme">
          <div :class="$style.content">{{ theme.content }}</div>
          <div :class="$style.commentBox">
            <img src="@/assets/icon/comment.svg" :class="$style.icon">
            <div :class="$style.count">{{ theme.comments.length }}</div>
          </div>
        </nuxt-link>
        <div :class="$style.answer">
          <nuxt-link :to="`/posts/${theme.id}`">
            お題への回答を見る
          </nuxt-link>
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
    const themes = await firebase
      .firestore()
      .collection("theme")
      .get()
      .then(collection => {
        return collection.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id
          };
        });
      });
    return {
      themes
    };
  }
};
</script>

<style module>
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
  position: relative;
  height: 12.5vh;
  width: 100%;
  background: #ffd857 0% 0%;
  font: normal normal bold 2.2vh/3.3vh Yu Gothic;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.content {
  margin: 0 auto;

}

.commentBox {
  display: flex;
  position: absolute;
  right: 5px;
  bottom: 5px;
  margin: 0 10px 0 auto;
}

.icon {
  width: 25px;
  height: 25px;
}

.theme_page {
  margin-top: 3vh;
}

.answer {
  display: flex;
  width: 100%;
  height: 6vh;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font: normal normal bold 1.7vh/2.7vh Yu Gothic;
}
</style>
