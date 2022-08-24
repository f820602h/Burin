import type { Middleware } from "./types";
import type { NavigationGuard } from "vue-router";
import { checkUserStatusMiddleware } from "./global";

const globalMiddleware: Middleware[] = [checkUserStatusMiddleware];

export const pipelineGuard: NavigationGuard = (to, from, next) => {
  let index: number;
  const middlewareArray = to.matched.reduce((acc, route) => {
    return [...acc, ...route.meta.middleware];
  }, globalMiddleware);

  if (!middlewareArray.length) return next();

  const concatenatedMiddleware: () => void = () => {
    index = index !== undefined ? index + 1 : 0;
    const isLastMiddleware = index === middlewareArray.length - 1;
    const nextPipeline = isLastMiddleware
      ? () => next()
      : concatenatedMiddleware;
    middlewareArray[index](to, from, next, nextPipeline);
  };

  concatenatedMiddleware();
};
