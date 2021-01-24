<template>
  <v-card max-width="400" class="mx-auto">
    <v-container fluid>
      <v-form ref="form" v-model="valid">
        <div>
          <p
            :class="
              errors.checkbox
                ? `theme--light v-label error--text`
                : `theme--light v-label`
            "
            style="margin-bottom: 0.5rem"
          >
            部位
          </p>
          <v-layout wrap>
            <v-flex xs4 v-for="(item, index) in bodyTarget" :key="index">
              <v-checkbox
                :input-value="item.checked"
                :label="item.target"
                :rules="[rules.check_least_1]"
                hide-details
                @change="changeCheckbox(item.target)"
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <div class="v-messages error--text">{{ messages.checkbox }}</div>
        </div>
        <div class="mt-4">
          <p>プログラム</p>
          {{menuData}}
          <div v-for="(items, index) in menuData" :key="index">
            <v-row>
              <v-col class="d-flex" cols="6">
                <v-select
                  :value="items.menu"
                  :items="menuList"
                  item-text="menuName"
                  item-value="menuName"
                  label="menu"
                  :rules="[rules.required]"
                  required
                  @change="changeMenuSelect($event, index)"
                ></v-select>
              </v-col>
              <v-col v-if="index !== 0" cols="2">
                <v-btn
                  fab
                  dark
                  x-small
                  color="pink"
                  @click="deleteMenuForm(index)"
                >
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-for="(item, itemIndex) in items.volume" :key="itemIndex">
              <v-col class="d-flex" cols="10">
                <p>・</p>
                <v-select
                  outlined
                  :value="item.weight"
                  :items="weight"
                  label="kg"
                  dense
                  :rules="[rules.required]"
                  required
                  @change="changeMenuVolume($event, 'weight', index, itemIndex)"
                ></v-select>
                <p>×</p>
                <v-select
                  outlined
                  :value="item.repetition"
                  :items="repetition"
                  label="rep"
                  :rules="[rules.required]"
                  required
                  dense
                  @change="changeMenuVolume($event, 'repetition', index, itemIndex)"
                ></v-select>
                <p>×</p>
                <v-select
                  outlined
                  :value="item.set"
                  :items="set"
                  label="set"
                  :rules="[rules.required]"
                  required
                  dense
                  @change="changeMenuVolume($event, 'set', index, itemIndex)"
                ></v-select>
              </v-col>
              <v-col
                v-if="
                  itemIndex == Object.keys(menuData[index].volume).length - 1
                "
                class="d-flex"
                cols="2"
              >
                <v-btn
                  fab
                  dark
                  x-small
                  color="indigo"
                  @click="addSetForm(index)"
                >
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
          <v-btn color="blue" class="mr-5" dark @click="confirmation"
            >確定</v-btn
          >
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import firebase from "~/plugins/firebase";
import db from "~/plugins/db";
export default {
  data() {
    return {
      menuList: "",
      weight: "",
      repetition: "",
      set: "",
      valid: true,
      rules: {
        required: (value) => {
          return !!value || "必ず選択してください";
        },
        check_least_1: () => {
          return (
            this.bodyTarget.filter((item) => {
              return item.checked;
            }).length !== 0 || "1つは必須選択です。"
          );
        },
      },
      errors: {
        checkbox: false,
      },
      messages: {
        checkbox: null,
      },
    };
  },
  methods: {
    addSetForm(index) {
      this.$store.dispatch("memo/addSetForm", index);
    },
    addMenuForm() {
      this.$store.dispatch("memo/addMenuForm");
    },
    deleteSetForm(index, itemIndex) {
      this.$store.dispatch("memo/deleteSetForm", {index, itemIndex});
    },
    deleteMenuForm(index) {
      this.$store.dispatch("memo/deleteMenuForm", index);
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
      const programArray = this.menuData
        .map((item) => {
          return item.volume.map((v) => {
            v.menu = item.menu;
            return v;
          });
        })
        .reduce((a, b) => {
          return a.concat(b);
        });
      return programArray;
    },
    changeCheckbox(bodyTarget) {
      // チェックボックス更新処理
      this.$store.dispatch("memo/changeCheckbox", bodyTarget);
      // バリデーション処理
      this.errors.checkbox = false;
      this.messages.checkbox = "";
      if (
        this.bodyTarget.filter((item) => {
          return item.checked;
        }).length === 0
      ) {
        this.errors.checkbox = true;
        this.messages.checkbox = "1つは必須選択です。";
      }
    },
    changeMenuSelect(event, index) {
      this.$store.dispatch("memo/changeMenuSelect", {event, index});
    },
    changeMenuVolume(event, paramName, index, itemIndex) {
      this.$store.dispatch("memo/changeMenuVolume", {event, paramName, index, itemIndex});
    },
    confirmation() {
      const validate = this.$refs.form.validate(); // ref="form"内のバリデーション結果をbooleanで返す
      if (validate) {
        // 入力欄に問題がない時
        // データを保存
        console.log("バリデーション結果：" + validate);
        // 保存
        this.saveMethod();
      } else {
        // 入力欄に問題がある時
        // バリデーションメッセージを表示
      }
    },
    async saveMethod() {
      // TODO:storeに移動
      // memoコレクションに保存
      const target = this.getBodyTarget().join("・");
      const memo = {
        target: target,
        userId: this.$store.state.user.userId,
        createDate: firebase.firestore.FieldValue.serverTimestamp(),
        // updateDate: ,
      };
      const memoRef = await db.collection("memo").add(memo);

      this.getProgram().forEach((item) => {
        // programsコレクションに保存
        const program = {
          menu: item.menu,
          weight: item.weight,
          repetition: item.repetition,
          set: item.set,
          // 小数点第2位を四捨五入
          rm:
            (Math.round((item.weight * item.repetition) / 40 + item.weight) *
              10) /
            10,
          userId: this.$store.state.user.userId,
          memo: memoRef,
          createDate: firebase.firestore.FieldValue.serverTimestamp(),
          // updateDate: ,
        };
        db.collection("programs").add(program);
      });
    },
  },
  mounted: function () {
    this.$store.dispatch("memo/setEditFrom", this.$route.query.memoId);
    this.menuList = this.$store.state.memo.menuList;
    this.weight = this.$store.state.memo.weight;
    this.repetition = this.$store.state.memo.repetition;
    this.set = this.$store.state.memo.set;
  },
  computed: {
    menuData: {
      get() {return this.$store.state.memo.menuData},
      set(val) {return console.log(val)}
    },
    bodyTarget: {
      get() {return this.$store.state.memo.bodyTarget},
      set(val) {return console.log(val)}
    },
  }
};
</script>