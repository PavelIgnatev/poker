const findInArray = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) === JSON.stringify(key)) {
      return i;
    }
  }

  return -1;
};

module.exports = { findInArray };
