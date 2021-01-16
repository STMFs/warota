import firebase from "@/plugins/firebase.js";

export const login = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      //未ログイン時
      const provider = new firebase.auth.GoogleAuthProvider();
      //Fix: サインイン時googleログイン画面にリダイレクトのほうが良さそう？(リダイレクトだとログインに失敗してた)
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          console.log("success:" + user);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("login error:" + errorMessage);
        });
    }
  });
}