import { Color } from "@/class/Color";

export interface TaskCategoryColors {
  [key: string]: Color;
}

export const taskCategoryColors: TaskCategoryColors = Object.freeze({
  red: new Color(["#C04848", "#480048"]),
  orange: new Color(["#Ef8E38", "#FC4A1A"]),
  green: new Color(["#159957", "#007991"]),
  blue: new Color(["#4568DC", "#182848"]),
  purple: new Color(["#AA4B6B", "#6441A5"]),
  default: new Color("#DDDDDD"),
});
