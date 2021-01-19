import auth from '~/plugins/auth'

export default () => {
  auth.login()
  console.log(auth.auth());
}