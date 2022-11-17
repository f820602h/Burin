import type { serviceWorkerMethods } from "@/service/sw";

type ServiceWorkerMethodParameters<
  T extends keyof typeof serviceWorkerMethods
> = typeof serviceWorkerMethods[T] extends (...args: infer P) => void
  ? P[0] extends undefined
    ? [`${T}`]
    : [`${T}`, P[0]]
  : never;

export function useServiceWorkerPostMessage<
  T extends keyof typeof serviceWorkerMethods
>(...arg: ServiceWorkerMethodParameters<T>): void {
  const payload = arg[1]
    ? { method: arg[0], data: arg[1] }
    : { method: arg[0] };
  navigator.serviceWorker.controller?.postMessage(payload);
}
