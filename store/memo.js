import db from '~/plugins/db'
import { menuNameList, bodyTargetList } from '~/static/menuData'
import { deepCopy } from '~/utils/deepCopy'

const initMenuData = [
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
];

export const state = () => ({
  menuData: '',
  bodyTarget: '',
  programIdArray: '',
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
  },
  setProgramIdArrayState(state, programIdArray) {
    state.programIdArray = programIdArray
  }
}

export const actions = {
  /**
   * メモを初期化
   * @param {*} param0 
   */
  initMemo({ commit, state }) {
    commit('setBodyTargetState', bodyTargetList);
    commit('setMenuDataState', initMenuData);
  },
  /**
   * 部位のチェックボックスを変更
   * @param {*} param0 
   * @param {*} target 
   */
  changeCheckbox({ commit, state }, target) {
    // チェックボックス変更処理
    const bodyTarget = deepCopy(state.bodyTarget);
    bodyTarget.map((item) => {
      if (item.target == target) {
        item.checked = !item.checked
      }
      return item
    });
    commit('setBodyTargetState', bodyTarget);
  },
  /**
   * メニューを変更
   * @param {*} param0 
   * @param {*} param1 
   */
  changeMenuSelect({ commit, state }, { event, index }) {
    const menuData = deepCopy(state.menuData);
    menuData[index].menu = event
    commit('setMenuDataState', menuData);
  },
  /**
   * メニューのボリューム（重さ、回数、セット）を変更
   * @param {*} param0 
   * @param {*} param1 
   */
  changeMenuVolume({ commit, state }, { event, paramName, index, itemIndex }) {
    const menuData = deepCopy(state.menuData);
    if (paramName == "weight") {
      menuData[index].volume[itemIndex].weight = event
    } else if (paramName == "repetition") {
      menuData[index].volume[itemIndex].repetition = event
    } else if (paramName == "set") {
      menuData[index].volume[itemIndex].set = event
    }
    commit('setMenuDataState', menuData);
  },
  /**
   * プログラムを追加
   * @param {*} param0 
   * @param {*} index 
   */
  addProgramForm({ commit, state }, index) {
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
  /**
   * メニューを追加
   * @param {*} param0 
   */
  addMenuForm({ commit, state }) {
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
  /**
   * プログラムを削除
   * @param {*} param0 
   * @param {*} param1 
   */
  deleteProgramForm({ commit, state }, { index, itemIndex }) {
    console.log("セット削除");
    const menuData = deepCopy(state.menuData);
    menuData[index].volume.splice(itemIndex, 1);
    commit('setMenuDataState', menuData);
  },
  /**
   * メニューを削除
   * @param {*} param0 
   * @param {*} index 
   */
  deleteMenuForm({ commit, state }, index) {
    console.log("メニュー削除");
    const menuData = deepCopy(state.menuData);
    menuData.splice(index, 1);
    commit('setMenuDataState', menuData);
  },
  /**
   * 編集データをセット
   * @param {*} param0 
   * @param {*} memoId 
   */
  setEditFrom({ commit, state }, memoId) {
    // bodyTargetをセット
    const memoRef = db.collection('memo').doc(memoId);
    memoRef.get().then(function (doc) {
      if (doc.exists) {
        const bodyTarget = deepCopy(bodyTargetList);
        const arrayBodyTarget = doc.data().target.split('・');
        bodyTarget.map(item => {
          if (arrayBodyTarget.indexOf(item.target) !== -1) {
            item.checked = true
          };
        });
        commit('setBodyTargetState', bodyTarget);
      }
    })
    // menuDataをセット
    const programsRef = db.collection('programs');
    programsRef.where("memoId", "==", memoId).get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        // 取得したデータを配列にpush
        let menuArray = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data()
          data.programId = doc.id
          menuArray.push(data)
        });
        // 配列を変形
        const menuData = []
        const menuList = menuNameList;
        menuList.forEach((item) => {
          const filterMenuData = menuArray.filter((menu) => {
            return menu.menu == item.menuName
          })
          if (!filterMenuData.length == 0) {
            menuData.push({ menu: item.menuName, volume: filterMenuData })
          }
        })
        commit('setMenuDataState', menuData);

        const programIdArray = [];
        menuData.forEach((items) => {
          items.volume.forEach((item) => {
            programIdArray.push(item.programId)
          })
        })
        commit('setProgramIdArrayState', programIdArray);
      }
    });
  }
}