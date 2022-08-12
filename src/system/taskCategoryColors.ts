export interface TaskCategoryColors {
  [key: string]: { start: string; end: string };
}

export const taskCategoryColors: TaskCategoryColors = Object.freeze({
  red: { start: "#C04848", end: "#480048" },
  orange: { start: "#Ef8E38", end: "#FC4A1A" },
  green: { start: "#159957", end: "#007991" },
  blue: { start: "#4568DC", end: "#182848" },
  purple: { start: "#AA4B6B", end: "#6441A5" },
  default: { start: "#DDDDDD", end: "#DDDDDD" },
});
