/**
 * RMを計算（小数点第2位を四捨五入）
 * @param {*} weight number
 * @param {*} repetition number
 * @return RM number
 */
export const calcRM = (weight, repetition) => {
  const RM = (Math.round((weight * repetition) / 40 + weight) *
          10) /
        10
  return RM
}