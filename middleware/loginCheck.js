import auth from '~/plugins/auth'
import firebase from '~/plugins/firebase'

export default async() => {
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('認証中')
    } else {
      console.log('未認証')
      auth.login()
    }
  })
}