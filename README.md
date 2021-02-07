# muscle-memo

## Firebase Setup
ホームディレクトリ配下に`.env`ファイルを作成
```bash
{
  "apiKey": "<API_KEY>",
  "authDomain": "<PROJECT_ID>.firebaseapp.com",
  "databaseURL": "https://<DATABASE_NAME>.firebaseio.com",
  "projectId": "<PROJECT_ID>",
  "storageBucket": "<BUCKET>.appspot.com",
  "messagingSenderId": "<SENDER_ID>"
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
