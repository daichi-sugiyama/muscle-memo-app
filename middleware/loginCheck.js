export default async function({ route, store }) {
  await store.dispatch('user/checkAuth')
  if (store.state.user.isAuth) {
    // Do nothing if authenticated...
  } else {
    store.dispatch('user/signIn')
  }
}