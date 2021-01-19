import firebase from '~/plugins/firebase'
import 'firebase/auth'

const provider = new firebase.auth.GoogleAuthProvider();

const auth = {
  // サインイン
  login() {
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => {})
      .catch((error) => console.log(error))
  },
  // サインアウト
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {console.log(error)})
  },
}

export default auth