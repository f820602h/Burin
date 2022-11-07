export interface Subscriber {
  interval: number;
  handler: () => void;
  subscribe: () => () => void;
  unsubscribe: () => void;
}

export interface Notifier {
  notify: () => void;
}

// export class Notifier {
//   subscriber: Subscriber | null;

//   constructor() {
//     this.subscriber = null;
//   }

//   subscribe(subscriber: Subscriber): () => void {
//     this.subscriber = subscriber;
//     return this.unsubscribe;
//   }

//   unsubscribe(): void {
//     this.subscriber = null;
//   }
// }
