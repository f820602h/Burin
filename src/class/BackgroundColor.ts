export class BackgroundColor {
  colors: string[] = [];
  isGradient: boolean;
  styleText: string;

  constructor(...args: string[]) {
    args.forEach((color) => {
      const regex = new RegExp(/^#[0-9 a-f A-F]{6}?/);
      if (!regex.test(color)) throw Error("error color format");
      this.colors.push(color);
    });
    this.isGradient = args.length > 1;
    this.styleText = this.isGradient
      ? `linear-gradient(135deg, ${this.colors.join(",")})`
      : this.colors[0];
  }
}
