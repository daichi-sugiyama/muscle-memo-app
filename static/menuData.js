// 部位
export const bodyTargetList = [
  { id: 1, target: "胸", checked: false },
  { id: 2, target: "肩", checked: false },
  { id: 3, target: "背中", checked: false },
  { id: 4, target: "脚", checked: false },
  { id: 5, target: "二頭", checked: false },
  { id: 6, target: "三頭", checked: false },
];

// 種目
export const menuNameList = [
  { id: 1, menuName: "ベンチプレス" },
  { id: 2, menuName: "スクワット" },
  { id: 3, menuName: "ベントオーバーロウ" },
]
// 重量
export const weightList = [40, 50, 60, 70, 80, 90, 100]
// 回数
export const repetitionList = Array.from(new Array(20)).map((v, i) => i + 1)
// セット数
export const setList = Array.from(new Array(10)).map((v, i) => i + 1)