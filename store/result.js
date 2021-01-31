import db from '~/plugins/db'
import moment from "moment";
import { sortDate } from "~/utils/sortDate.js"
import { menuNameList } from '~/static/menuData'

export const state = () => ({
  programsData: ""
})

export const mutations = {
  setProgramsDataState(state, programsData) {
    state.programsData = programsData
  }
}

export const actions = {
  async setProgramsData({ commit }, userId) {
    let programsArray = []
    menuNameList.forEach((menu) => {
      programsArray.push({ menuName: menu.menuName, programs: [] })
    })
    await db
      .collection("programs")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((query) => {
          let data = query.data();
          data.createDate = moment(data.createDate.seconds * 1000).format('YYYY/MM/DD');
          // 種目ごとに配列にデータを追加
          programsArray.map((value) => {
            if (value.menuName == data.menu) {
              value.programs.push(data)
            }
          });
        });
      });
    programsArray.map((array) => {
      array.programs = sortDate(array.programs)
    })
    commit('setProgramsDataState', programsArray)
  },
}