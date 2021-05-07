export const renderMusical = (str?: string): string => {
  if (!str || !str.length) {
    return "";
  }

  const findList = ["#", "bb", "b", "n", "~", "x"];
  const replace = ["♯", "𝄫", "♭", "♮", "♮", "𝄪"];

  let newStr = str;
  findList.forEach((findMe, idx) => {
    newStr = newStr.replace(new RegExp(findMe, "g"), replace[idx]);
  });

  return newStr;
};
