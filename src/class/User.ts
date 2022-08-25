export type UserObject = {
  id: string;
  name: string;
  email: string;
  password?: string;
  createTimestamp: number;
  updateTimestamp: number;
};

export class User implements UserObject {
  id: UserObject["id"];
  name: UserObject["name"];
  email: UserObject["email"];
  password?: UserObject["password"];
  createTimestamp: UserObject["createTimestamp"];
  updateTimestamp: UserObject["updateTimestamp"];

  constructor(arg: UserObject) {
    this.id = arg.id;
    this.name = arg.name;
    this.email = arg.email;
    this.createTimestamp = arg.createTimestamp;
    this.updateTimestamp = arg.updateTimestamp;
  }
}
