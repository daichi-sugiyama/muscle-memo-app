export default function({ route, store }) {
  if (store.state.user.isAuth) {
    // Do nothing if authenticated...
  } else {
    if (route.path === '/') {
      store.dispatch('user/checkAuth')
    } else {
      // @see https://www.yo1000.com/nuxt-spa-redirect/
      window.location.href = '/'
      return new Promise(resolve => {
        // Wait for broswer to redirect...
      })
    }
  }
}