export const mockTaskCategoryApiData = [
  {
    id: "tc1",
    name: "工作",
    startColor: "#159957",
    endColor: "#007991",
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
  {
    id: "tc2",
    name: "家事",
    startColor: "#4568DC",
    endColor: "#182848",
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
];

export const mockTaskApiData = [
  {
    id: "t1",
    categoryId: "tc1",
    title: "功能開發",
    addition: {
      content: "不具有初始化函式並且之前的列舉成員是常數",
      isLink: false,
    },
    lastStartTimestamp: new Date().getTime(),
    lastEndTimestamp: new Date().getTime() + 1000 * 60 * 60,
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
  {
    id: "t2",
    categoryId: "tc2",
    title: "洗盤子",
    addition: {
      content: "好多好多盤子要洗",
      isLink: false,
    },
    lastStartTimestamp: new Date().getTime(),
    lastEndTimestamp: new Date().getTime() + 1000 * 60 * 60,
    createTimestamp: new Date().getTime(),
    updateTimestamp: new Date().getTime(),
  },
];
