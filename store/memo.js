import db from '~/plugins/db'

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
  changeMenuSelect({ commit, state }, {event, index}) {
    const menuData = deepCopy(state.menuData);
    menuData[index].menu = event
    commit('setMenuDataState', menuData);
  },
  changeMenuVolume({ commit, state }, {event, paramName, index, itemIndex}) {
    const menuData = deepCopy(state.menuData);
    if (paramName == "weight") {
      menuData[index].volume[itemIndex].weight = event
    } else if(paramName == "repetition") {
      menuData[index].volume[itemIndex].repetition = event
    } else if(paramName == "set") {
      menuData[index].volume[itemIndex].set = event
    }
    commit('setMenuDataState', menuData);
  },
  addSetForm({ commit, state }, index) {
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
  deleteSetForm({ commit, state }, { index, itemIndex }) {
    console.log("セット削除");
    const menuData = deepCopy(state.menuData);
    menuData[index].volume.splice(itemIndex, 1);
    commit('setMenuDataState', menuData);
  },
  deleteMenuForm({ commit, state }, index) {
    console.log("メニュー削除");
    const menuData = deepCopy(state.menuData);
    menuData.splice(index, 1);
    commit('setMenuDataState', menuData);
  },
  // 編集画面のデータをセット
  setEditFrom({ commit, state }, memoId) {
    // bodyTargetをセット
    const memoRef = db.collection('memo').doc(memoId);
    memoRef.get().then(function (doc) {
      if (doc.exists) {
        const bodyTarget = [
          { id: 1, target: "胸", checked: false },
          { id: 2, target: "肩", checked: false },
          { id: 3, target: "背中", checked: false },
          { id: 4, target: "脚", checked: false },
          { id: 5, target: "二頭", checked: false },
          { id: 6, target: "三頭", checked: false },
        ];
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
          menuArray.push(doc.data())
        });
        // 配列を変形
        const menuData = []
        const menuList = deepCopy(state.menuList);
        menuList.forEach((item) => {
          const filterMenuData = menuArray.filter((menu) => {
            return menu.menu == item.menuName
          })
          if (!filterMenuData.length == 0) {
            menuData.push({menu: item.menuName, volume: filterMenuData})
          }
        })
        commit('setMenuDataState', menuData);
      }
    });
  }
}