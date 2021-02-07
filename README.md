# muscle-memo
ApplicationURL：https://muscle-memo-app.web.app/

## Firebase Setup
ホームディレクトリ配下に`.env`ファイルを作成
```bash
{
  "FB_API_KEY": "<API_KEY>",
  "FB_AUTH_DOMAIN": "<PROJECT_ID>.firebaseapp.com",
  "FB_DATABASE_URL": "https://<DATABASE_NAME>.firebaseio.com",
  "FB_PROJECTID": "<PROJECT_ID>",
  "FB_STORAGE_BUCKET": "<BUCKET>.appspot.com",
  "FB_MESSAGING_SENDER_ID": "<SENDER_ID>"
  "FB_APP_ID": "<APP_ID>"
  "FB_MEASUREMENT_ID": "<MEASUREMENT_ID>"
}
```
参考：https://qiita.com/ririli/items/d0d3a6ae78c1b6e827fc

## Build Setup

```bash
# deploy firebase hosting
$ firebase deploy

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
