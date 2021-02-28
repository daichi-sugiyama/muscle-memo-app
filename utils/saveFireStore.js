// 追加、更新の共通処理
import db from "~/plugins/db";

/**
 * firestoreに保存
 * @param {*} bodyTarget 
 * @param {*} programs 
 * @param {*} userId 
 * @param {*} createDate 
 * @return void
 */
export const saveMethod = async (bodyTarget, programs, userId, createDate) => {
  // memoコレクションに保存
  const target = bodyTarget.join("・");
  const memo = {
    target: target,
    userId: userId,
    createDate: createDate,
  };
  const memoRef = await db.collection("memo").add(memo);
  programs.forEach(async (item) => {
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
      userId: userId,
      memoId: memoRef.id,
      createDate: createDate,
    };
    await db.collection("programs").add(program);
  });
}

/**
 * firestoreに更新
 * @param {*} bodyTarget 
 * @param {*} programs 
 * @param {*} userId 
 * @param {*} memoId 
 * @param {*} programsIdArray 
 * @param {*} updateDate 
 * @return void
 */
export const editMethod = async (bodyTarget, programs, userId, memoId, programsIdArray, updateDate) => {
  // memoコレクションに更新
  const target = bodyTarget.join("・");
  const memo = {
    target: target,
    updateDate: updateDate,
  };
  await db
    .collection("memo")
    .doc(memoId)
    .update(memo);

  let programsId = JSON.parse(JSON.stringify(programsIdArray));
  programs.forEach(async (item) => {
    // programsコレクションに更新
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
      userId: userId,
    };
    if (!!item.programId) {
      // programIdが存在する場合、更新
      programsId = programsId.filter((id) => {
        return id != item.programId;
      });
      program.updateDate = updateDate;
      await db.collection("programs").doc(item.programId).update(program);
    } else {
      // programIdが存在しない場合、追加
      program.createDate = updateDate;
      program.memoId = memoId;
      await db.collection("programs").add(program);
    }
  });
  // program削除処理
  if (programsId.length) {
    programsId.forEach(async (id) => {
      await db.collection("programs").doc(id).delete();
    });
  }
}