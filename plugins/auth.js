import firebase from '~/plugins/firebase'
import 'firebase/auth'

const provider = new firebase.auth.GoogleAuthProvider();

const auth = {
  // サインイン
  login() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },
  // サインアウト
  logout() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve())
        .catch(err => reject(err))
    })
  },
  // 認証状態の変更検知
  auth() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user))
    })
  }
}

export default auth