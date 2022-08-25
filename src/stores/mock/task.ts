export const mockTaskCategoryApiData = [
  {
    id: 1,
    name: "工作",
    startColor: "#159957",
    endColor: "#007991",
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
  {
    id: 2,
    name: "家事",
    startColor: "#4568DC",
    endColor: "#182848",
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
];

export const mockTaskApiData = [
  {
    id: 1,
    categoryId: 1,
    title: "功能開發",
    additionContent: "不具有初始化函式並且之前的列舉成員是常數",
    additionUrl: "",
    lastStartTimestamp: new Date().getTime(),
    lastEndTimestamp: new Date().getTime() + 1000 * 60 * 60,
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
  {
    id: 2,
    categoryId: 2,
    title: "洗盤子",
    additionContent: "好多好多盤子要洗",
    additionUrl: "",
    lastStartTimestamp: new Date().getTime(),
    lastEndTimestamp: new Date().getTime() + 1000 * 60 * 60,
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
];
