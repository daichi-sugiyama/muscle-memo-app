import db from '~/plugins/db'
import moment from "moment";
import { decsDate } from "~/utils/sortDate.js"
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
      // RMが一番大きいプログラムを取得
      array.programs = getOnlyDateMaxRM(array.programs)
      // 種目ごとに降順にプログラムを並べ替える
      array.programs = decsDate(array.programs)
    })
    commit('setProgramsDataState', programsArray)
  },
}

// RMが一番大きいプログラムを取得
const getOnlyDateMaxRM = (programs) => {
  let onlyPrograms = [];
  let samePrograms = [];

  // 各日付のプログラムをonlyPrograms、重複データをsameProgramsに挿入
  programs.forEach((x, i, self) => {
    if (self.findIndex(({ createDate }) => createDate === x.createDate) === i) {
      // 重複していないものをpush
      onlyPrograms.push(x)
    } else {
      // 重複しているもの
      samePrograms.push(x)
    }
  });

  // 日付ごとにプログラムをグループ化
  var groupSamePrograms = {};
  samePrograms.forEach(function (i, j) {
    var cat = i["createDate"];
    if (typeof groupSamePrograms[cat] == "undefined") groupSamePrograms[cat] = [];
    groupSamePrograms[cat].push(i);
  });

  // 各日付の最大値をonlyProgramsに挿入
  Object.keys(groupSamePrograms).forEach((createDate) => {
    let rmMaxProgram = groupSamePrograms[createDate].reduce((a,b)=>a.rm>b.rm?a:b)
    let targetOnlyProgram = onlyPrograms.filter((program) => {
      if (program.createDate === createDate) {
        return program
      }
    });
    // onlyProgramsのRM値を超えた場合、プログラムを入れ替え
    if (rmMaxProgram.rm >= targetOnlyProgram.rm) {
      onlyPrograms.map((program) => {
        if(program.createDate === createDate) {
          program = rmMaxProgram
        }
      });
    }
  });
  return onlyPrograms;
}
