export declare type StateSubscriptionFn<T> = (newVal: T, oldVal: T) => void;
export declare class State<T> {
    private _val;
    private _subs;
    get val(): T;
    set val(value: T);
    constructor(initialValue: T);
    subscribe(fn: StateSubscriptionFn<T>): () => void;
}
export declare function state<T>(initialValue: T): State<T>;
