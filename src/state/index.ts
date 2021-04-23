export type StateSubscriptionFn<T> = (newVal: T, oldVal: T) => void;

export class State<T> {
  private _val: T;
  private _subs = new Set<StateSubscriptionFn<T>>();

  get val(): T {
    return this._val;
  }

  set val(value: T) {
    const oldVal = this._val;
    this._val = value;

    for (const sub of this._subs) {
      sub(value, oldVal);
    }
  }

  constructor(initialValue: T) {
    this.val = initialValue;
  }

  subscribe(fn: StateSubscriptionFn<T>): () => void {
    this._subs.add(fn);

    return () => {
      this._subs.delete(fn);
    };
  }
}

export function state<T>(initialValue: T): State<T> {
  return new State<T>(initialValue);
}
