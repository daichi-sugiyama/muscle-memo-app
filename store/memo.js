import db from '~/plugins/db'
import moment from "moment";

const deepCopy = (value) => {
  return JSON.parse(JSON.stringify(value))
}

export const state = () => ({
  menuData: [
    {
      menu: "",
      volume: [
        {
          weight: "",
          repetition: "",
          set: "",
        },
      ],
    },
  ],
  bodyTarget: [
    { id: 1, target: "胸", checked: false },
    { id: 2, target: "肩", checked: false },
    { id: 3, target: "背中", checked: false },
    { id: 4, target: "脚", checked: false },
    { id: 5, target: "二頭", checked: false },
    { id: 6, target: "三頭", checked: false },
  ],
  menuList: [
    { id: 1, menuName: "ベンチプレス" },
    { id: 2, menuName: "スクワット" },
    { id: 3, menuName: "ベントオーバーロウ" },
  ],
  weight: [40, 50, 60, 70, 80, 90, 100],
  repetition: Array.from(new Array(20)).map((v, i) => i + 1),
  set: Array.from(new Array(10)).map((v, i) => i + 1),
})

export const getters = {
  menuData(state) {
    return state.menuData;
  },
  bodyTarget(state) {
    return state.bodyTarget;
  }
}

export const mutations = {
  setMenuDataState(state, menuData) {
    state.menuData = menuData
  },
  setBodyTargetState(state, bodyTarget) {
    state.bodyTarget = bodyTarget
  }
}

export const actions = {
  addSetForm({commit, state}, index) {
    console.log("セット追加");
    const menuData = deepCopy(state.menuData);
    menuData[index].volume.push({
      target: "",
      weight: "",
      repetition: "",
      set: "",
    });
    commit('setMenuDataState', menuData);
  },
  addMenuForm({commit, state}) {
    console.log("メニュー追加");
    const menuData = deepCopy(state.menuData);
    menuData.push({
      menu: "",
      volume: [
        {
          target: "",
          weight: "",
          repetition: "",
          set: "",
        },
      ],
    });
    commit('setMenuDataState', menuData);
  },
  deleteSetForm({commit, state}, {index, itemIndex}) {
    console.log("セット削除");
    const menuData = deepCopy(state.menuData);
    menuData[index].volume.splice(itemIndex, 1);
    commit('setMenuDataState', menuData);
  },
  deleteMenuForm({commit, state}, index) {
    console.log("メニュー削除");
    const menuData = deepCopy(state.menuData);
    menuData.splice(index, 1);
    commit('setMenuDataState', menuData);
  },
}