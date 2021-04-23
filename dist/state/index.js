export class State {
    constructor(initialValue) {
        this._subs = new Set();
        this.val = initialValue;
    }
    get val() {
        return this._val;
    }
    set val(value) {
        this._val = value;
    }
    subscribe(fn) {
        this._subs.add(fn);
        return () => {
            this._subs.delete(fn);
        };
    }
}
export function state(initialValue) {
    return new State(initialValue);
}
