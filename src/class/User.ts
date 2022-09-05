export interface UserId {
  id: number;
}

export interface UserInfo extends UserId {
  name: string;
  email: string;
  password: string;
}

export interface UserCompleteInfo extends Omit<UserInfo, "password"> {
  createTimestamp: number;
  updateTimestamp: number;
}

export class User implements UserCompleteInfo {
  id: UserCompleteInfo["id"];
  name: UserCompleteInfo["name"];
  email: UserCompleteInfo["email"];
  createTimestamp: UserCompleteInfo["createTimestamp"];
  updateTimestamp: UserCompleteInfo["updateTimestamp"];

  constructor(arg: UserCompleteInfo) {
    this.id = arg.id;
    this.name = arg.name;
    this.email = arg.email;
    this.createTimestamp = arg.createTimestamp;
    this.updateTimestamp = arg.updateTimestamp;
  }
}
