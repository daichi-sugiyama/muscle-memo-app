<template>
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
        <p class="theme--light v-label">プログラム</p>
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
                @change="
                  changeMenuVolume($event, 'repetition', index, itemIndex)
                "
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
              v-if="itemIndex == Object.keys(menuData[index].volume).length - 1"
              class="d-flex"
              cols="2"
            >
              <v-btn fab dark x-small color="indigo" @click="addProgramForm(index)">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col v-else cols="2">
              <v-btn
                fab
                dark
                x-small
                color="pink"
                @click="deleteProgramForm(index, itemIndex)"
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
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" dark v-bind="attrs" v-on="on"> 戻る </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2">
              ホーム画面に戻っても良いですか？
            </v-card-title>
            <v-card-text class="mt-3">
              戻ったものは保存されません。
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                いいえ
              </v-btn>
              <v-btn color="primary" text @click="deleteMemo"> はい </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="blue" class="mr-5" dark @click="confirmation">確定</v-btn>
      </div>
    </v-form>
  </v-container>
</template>
<script>
import firebase from "~/plugins/firebase";
import db from "~/plugins/db";
import {
  menuNameList,
  weightList,
  repetitionList,
  setList,
} from "~/static/menuData";
import { deepCopy } from "~/utils/deepCopy";
import { saveMethod, editMethod } from "~/utils/saveFireStore";
export default {
  data() {
    return {
      menuList: menuNameList,
      weight: weightList,
      repetition: repetitionList,
      set: setList,
      memoId: this.$route.query.memoId,
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
      dialog: false,
    };
  },
  methods: {
    addProgramForm(index) {
      this.$store.dispatch("memo/addProgramForm", index);
    },
    addMenuForm() {
      this.$store.dispatch("memo/addMenuForm");
    },
    deleteProgramForm(index, itemIndex) {
      this.$store.dispatch("memo/deleteProgramForm", { index, itemIndex });
    },
    deleteMenuForm(index) {
      this.$store.dispatch("memo/deleteMenuForm", index);
    },
    deleteMemo() {
      // ホーム画面に戻る
      this.$router.push("/");
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
    getPrograms() {
      const programArray = deepCopy(this.menuData)
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
      this.$store.dispatch("memo/changeMenuSelect", { event, index });
    },
    changeMenuVolume(event, paramName, index, itemIndex) {
      this.$store.dispatch("memo/changeMenuVolume", {
        event,
        paramName,
        index,
        itemIndex,
      });
    },
    async confirmation() {
      const validate = this.$refs.form.validate(); // ref="form"内のバリデーション結果をbooleanで返す
      if (validate) {
        // 入力欄に問題がない時
        console.log("バリデーション結果：" + validate);
        if (!this.memoId) {
          // 追加
          await saveMethod(
            this.getBodyTarget(),
            this.getPrograms(),
            this.$store.state.user.userId,
            firebase.firestore.FieldValue.serverTimestamp()
          );
        } else {
          // 更新
          await editMethod(
            this.getBodyTarget(),
            this.getPrograms(),
            this.$store.state.user.userId,
            this.memoId,
            this.programIdArray,
            firebase.firestore.FieldValue.serverTimestamp()
          );
        }
        // ホーム画面に戻る
        this.$router.push("/");
      }
    },
  },
  computed: {
    menuData: {
      get() {
        return this.$store.state.memo.menuData;
      },
      set(val) {
        return console.log(val);
      },
    },
    bodyTarget: {
      get() {
        return this.$store.state.memo.bodyTarget;
      },
      set(val) {
        return console.log(val);
      },
    },
    programIdArray: {
      get() {
        return this.$store.state.memo.programIdArray;
      },
      set(val) {
        return console.log(val);
      },
    },
  },
};
</script>