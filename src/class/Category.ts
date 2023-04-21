export interface CategoryId {
  id: number;
}

export interface CategoryInfo extends CategoryId {
  category: string;
}

export interface CategoryCompleteInfo extends CategoryInfo {
  createTimestamp: number;
  updateTimestamp: number;
}

export class Category implements CategoryCompleteInfo {
  id: CategoryCompleteInfo["id"];
  category: CategoryCompleteInfo["category"];
  createTimestamp: CategoryCompleteInfo["createTimestamp"];
  updateTimestamp: CategoryCompleteInfo["updateTimestamp"];

  constructor(arg: CategoryCompleteInfo) {
    this.id = arg.id;
    this.category = arg.category;
    this.createTimestamp = arg.createTimestamp;
    this.updateTimestamp = arg.updateTimestamp;
  }
}
