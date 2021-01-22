import firebase from '~/plugins/firebase'
import auth from '../plugins/auth'

export const state = () => ({
  isAuth: false,
  uid: '',
  displayName: '',
  email: '',
})

export const mutations = {
  setSignInState(state, user) {
    state.isAuth = !!user
    state.userId = user.uid
  }
}

export const actions = {
  async signIn({ commit }) {
    await firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(res => commit('setSignInState', res.user))
      .catch((error) => console.log(error))
  },
  async signOut({ commit }) {
    await firebase
      .auth()
      .signOut()
      .then(res => {
        commit('setSignInState', false)
      })
  },
  async checkAuth({ commit }) {
    await auth().then(user => commit('setSignInState', user))
  }
}