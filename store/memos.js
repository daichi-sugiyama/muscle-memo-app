import db from '~/plugins/db'
import moment from "moment";

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
          createData: moment(doc.data().createDate.seconds * 1000).format('YYYY/MM/DD'),
        }
        memosArray.push(memos)
      }
    })
    // 日付順に並び替え
    memosArray.sort(function (a, b) {
      if (a.createData > b.createData) return -1;
      if (a.createData < b.createData) return 1;
      return 0;
    });
    console.log(memosArray)
    commit('setMemosState', memosArray)
  }
}