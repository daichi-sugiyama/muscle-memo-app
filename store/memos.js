import db from '~/plugins/db'
import moment from "moment";
import { sortDate } from "~/utils/sortDate.js"

export const state = () => ({
  memos: ''
})

export const mutations = {
  setMemosState(state, memos) {
    state.memos = memos
  }
}

export const actions = {
  async getMemosData({ commit }, userId) {
    let memosArray = []
    const memosRef = db.collection("memo");
    const querySnapshot = await memosRef.where("userId", "==", userId).get()
    querySnapshot.forEach((doc) => {
      if (doc.data().createDate) {
        const memos = {
          title: '【' + doc.data().target + '】' + moment(doc.data().createDate.seconds * 1000).format('YYYY/MM/DD'),
          memoId: doc.id,
          createDate: moment(doc.data().createDate.seconds * 1000).format('YYYY/MM/DD HH:mm:ssZ'),
        }
        memosArray.push(memos)
      }
    })
    // 日付順に並び替え
    memosArray = sortDate(memosArray)
    commit('setMemosState', memosArray)
  }
}