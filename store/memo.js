import db from '~/plugins/db'
import moment from "moment";

export const state = () => ({
  memo: ''
})

export const mutations = {
  setMemoState(state, memo) {
    state.memo = memo
  }
}

export const actions = {
  async getMemoData({ commit }, userId) {
    let memoArray = []
    const memoRef = db.collection("memo");
    const querySnapshot = await memoRef.where("userId", "==", userId).get()
    querySnapshot.forEach((doc) => {
      if (doc.data().createDate) {
        const memo = {
          title: '【' + doc.data().target + '】' + moment(doc.data().createDate.seconds * 1000).format('YYYY/MM/DD'),
          memoId: doc.id,
          createData: moment(doc.data().createDate.seconds * 1000).format('YYYY/MM/DD'),
        }
        memoArray.push(memo)
      }
    })
    // 日付順に並び替え
    memoArray.sort(function (a, b) {
      if (a.createData > b.createData) return -1;
      if (a.createData < b.createData) return 1;
      return 0;
    });
    console.log(memoArray)
    commit('setMemoState', memoArray)
  }
}