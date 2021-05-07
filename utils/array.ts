export const shuffle = (a: Array<any>): Array<any> => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const sortByIndex = (array: any, indexes: number[]) => {
  const arr: any = [];

  array.forEach((item: any, idx: number) => {
    if (indexes[idx] >= 0) {
      arr[indexes[idx]] = item;
    }
  });

  return arr;
};

export const chooseRandomIndex = (array: any) => {
  return Math.floor(Math.random() * array.length);
};

export const unique = (array: any) => {
  return [...new Set(array)];
};

export const arraysMatch = (arr1: any[], arr2: any[]) => {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if all items exist and are in the same order
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // Otherwise, return true
  return true;
};

// TODO unit test me
export const selectRandom = (x: Array<any>): any => {
  return x[chooseRandomIndex(x)];
};

export const selectRandomWithWeight = (
  items: string[],
  previousItem: string,
  weight = 85
) => {
  const prev = 100 - weight;
  // create an array of chances, if the item is the previous item then we'll
  // only want to select it with a chance of 30%, otherwise 70%
  const chances = items.map((i) => (i === previousItem ? prev : weight));

  const sum = chances.reduce((acc, el) => acc + el, 0);
  let acc = 0;
  const mappedChances = chances.map((el) => (acc = el + acc));
  const rand = Math.random() * sum;
  const result = items[mappedChances.filter((el) => el <= rand).length];

  return result;
};

// TODO unit test me
export const groupBy = function (xs: any[], key: string) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

// TODO rewrite this
// I just copied it. Very unreadable. but works soooooo
export const generatePermutations = (
  arr: Array<Record<string, Array<any>>>
) => {
  const keys = arr.map((o) => Object.keys(o)[0]); //Get the list of keys
  return arr
    .map((o) => Object.values(o)[0]) //Convert the array of objects into multi dimensional array.
    .reduce((c, v) => [].concat(...c.map((o) => v.map((x) => [].concat(o, x))))) //Make all possible combinations
    .map((o) => o.reduce((c, v, i) => Object.assign(c, { [keys[i]]: v }), {})); //Construct the final format
};
