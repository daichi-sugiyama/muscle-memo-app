// テストユーザ用のダミーデータを作成するスクリプト
import { saveMethod } from "~/utils/saveFireStore";
import firebase from "~/plugins/firebase";

import {
  menuNameList,
  weightList,
  repetitionList,
  setList,
} from "~/static/menuData";

export const testUserSeeder = () => {
  const testUserID = '7TVDt0miLHNkz4G25uufkQrqUEP2' //テストユーザID
  const count = 50 // ダミーデータの数
  for (let i = 0; i < count; i++) {
    // bodyTargetのダミーデータ作成
    let bodyTarget = createDummybodyTargetData();

    // programsのダミーデータ作成
    let programs = createDummyProgramData();

    // createDateのダミーデータ作成
    let createDate = createDumyCreateDate(count-i);
    
    // ダミーデータを保存
    saveMethod(bodyTarget, programs, testUserID, createDate)
  }
}

/**
 * bodyTargetのダミーデータを作成
 * @return array
 */
const createDummybodyTargetData = () => {
  let bodyTarget = []
  bodyTarget.push(getRandomString(["胸", "肩", "背中", "脚", "二頭", "三頭",]))
  return bodyTarget;
}

/**
 * programsのダミーデータを作成
 * @return array
 */
const createDummyProgramData = () => {
  let menu = getRandomString(menuNameList).menuName
  let weight = getRandomString(weightList)
  let reptition = getRandomString(repetitionList)
  let set = getRandomString(setList)
  let programs = []
  programs.push({
    menu: menu,
    repetition: reptition,
    set: set,
    weight: weight
  })
  return programs;
}

/**
 * createDateのダミーデータを作成
 * @param number
 * @return timestamp
 */
const createDumyCreateDate = (day) => {
  let date = new Date()
  date.setDate(date.getDate() - day);
  return firebase.firestore.Timestamp.fromDate(date)
}

/**
 * 配列の値からランダムで1つ選択して返す
 * @param array arrayData
 * @return string
 */
const getRandomString = (arrayData) => {
  var arrayIndex = Math.floor(Math.random() * arrayData.length);
  return arrayData[arrayIndex];
}