<template>
  <v-container fluid>
    <div>
      <p>部位</p>
      <v-layout wrap>
        <v-flex xs4 v-for="(item, index) in bodyTarget" :key="index">
          <v-checkbox v-model="item.checked" :label="item.target"></v-checkbox>
        </v-flex>
      </v-layout>
    </div>
    <div>
      <p>プログラム</p>
      デバック用:{{ menuData }}
      <div v-for="(items, index) in menuData" :key="index">
        <v-row>
          <v-col class="d-flex" cols="6">
            <v-select
              v-model="items.menu"
              :items="menuList"
              item-text="menuName"
              item-value="menuName"
              label="menu"
            ></v-select>
          </v-col>
          <v-col v-if="index !== 0" cols="2">
            <v-btn fab dark x-small color="pink" @click="deleteMenuForm(index)">
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-for="(item, itemIndex) in items.volume" :key="itemIndex">
          <v-col class="d-flex" cols="10">
            <p>・</p>
            <v-select
              outlined
              v-model="item.weight"
              :items="weight"
              :value="weight"
              label="kg"
              dense
            ></v-select>
            <p>×</p>
            <v-select
              outlined
              v-model="item.repetition"
              :items="repetition"
              value="repetition"
              label="rep"
              dense
            ></v-select>
            <p>×</p>
            <v-select
              outlined
              v-model="item.set"
              :items="set"
              value="set"
              label="set"
              dense
            ></v-select>
          </v-col>
          <v-col
            v-if="itemIndex == Object.keys(menuData[index].volume).length - 1"
            class="d-flex"
            cols="2"
          >
            <v-btn fab dark x-small color="indigo" @click="addSetForm(index)">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col v-else cols="2">
            <v-btn
              fab
              dark
              x-small
              color="pink"
              @click="deleteSetForm(index, itemIndex)"
            >
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="index == Object.keys(menuData).length - 1">
          <v-col cols="12">
            <div class="text-center">
              <v-btn rounded color="primary" dark @click="addMenuForm">
                メニューを追加
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="text-center mt-7">
      <v-btn color="red" class="mr-5" dark>削除</v-btn>
      <v-btn color="blue" class="mr-5" dark @click="confirmation">確定</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {
    addSetForm(index) {
      console.log("セット追加:" + index);
      this.menuData[index].volume.push({
        target: "",
        weight: "",
        repetition: "",
        set: "",
      });
    },
    addMenuForm() {
      console.log("メニュー追加");
      this.menuData.push({
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
    },
    deleteSetForm(index, itemIndex) {
      console.log("セット削除:" + Number(index + 1) + "個目");
      this.menuData[index].volume.splice(itemIndex, 1);
    },
    deleteMenuForm(index) {
      console.log("メニュー削除" + Number(index + 1) + "個目");
      this.menuData.splice(index, 1);
    },
    getBodyTarget() {
      const checkedFilter = this.bodyTarget.filter((item) => {
        return item.checked;
      });
      const target = checkedFilter
        .map((item) => {
          return [item.target];
        })
        .reduce((a, b) => {
          return a.concat(b);
        });
      return target;
    },
    getProgram() {
      const programArray = this.menuData.map((item) => {
        return item.volume.map((v) => {
          v.menu = item.menu
          return v;
        })
      }).reduce((a, b) => {
        return a.concat(b);
      });
      return programArray
    },
    confirmation() {
      const validate = true;
      if(validate) {
        // 入力欄に問題がない時
        // モーダルを表示

      } else {
        // 入力欄に問題がある時
        // バリデーションメッセージを表示

      }
    },
    submit() {
      console.log("--- 部位を取得 ---");
      console.log(this.getBodyTarget());
      console.log("--- プログラムを取得 ---");
      console.log(this.getProgram());
    },
  },
};
</script>