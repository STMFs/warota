<template>
  <div>
    <h1>お題投稿</h1>
    <form @submit="$event.preventDefault(), themePost()">
      <textarea maxlength='50' placeholder='50文字以内' v-model="value" required />
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

<style>
  div {
    width: 375px;
    height:300px;
    background: white;
    text-align:left;
    margin-left: auto;
    margin-right: auto;
  }
  body {
    -webkit-text-size-adjust: 100%;
    margin-right: auto;
    margin-left : auto;
    width: 700px;
    background: #F5F5F5 0% 0% no-repeat padding-box;
  
  }
  h1 {
    width:140px;
    height:45px;
    letter-spacing:0px;
    margin: 22px 0px 22px 40px;
    padding-top: 22px;
    font: normal normal bold 35px/56px Yu Gothic;
  }
  form {
    width:280px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  textarea {
    top: 160px;
    left: 48px;
    width: 280px;
    height: 120px;
    border: 1px solid #000;
    border-radius: 5px;
    margin: 30px 0px 30px 0px;
  }
  ::placeholder {
    font: normal normal bold 15px/24px Yu Gothic;
    color: #a5a5a5;
    padding-left:10px;
  }
 button {
   font: normal normal bold 15px/24px Yu Gothic;
   color: #1492E6;
   font-size:15px;
   background: white 0% 0% no-repeat padding-box;
   border: 1px solid #000;
   border-radius: 4px;
   text-align: center;
   width:80px;
   height:30px;
}

</style>
