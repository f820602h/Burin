export class Color {
  readonly hexStringList: string[] = [];
  readonly styleString: string;

  constructor(args: string | string[]) {
    const hexRegex = new RegExp(/^#[0-9 a-f A-F]{6}?/);

    if (Array.isArray(args)) {
      this.hexStringList = args.filter((hex) => hexRegex.test(hex));
    } else if (hexRegex.test(args)) {
      this.hexStringList = [args];
    }

    this.styleString =
      this.hexStringList.length > 1
        ? `linear-gradient(135deg, ${this.hexStringList.join(",")})`
        : this.hexStringList[0];
  }
}
