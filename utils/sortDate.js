export const sortDate = (array) => {
  array.sort(function (a, b) {
    if (a.createDate > b.createDate) return -1;
    if (a.createDate < b.createDate) return 1;
    return 0;
  })
  return array
}

export const decsDate = (array) => {
  array.sort(function (a, b) {
    if (a.createDate > b.createDate) return 1;
    if (a.createDate < b.createDate) return -1;
    return 0;
  })
  return array
}