const subs: Map<State<unknown>, Set<StateSubscriptionFn<unknown>>> = new Map();

export type StateSubscriptionFn<T> = (newVal: T, oldVal: T) => void;

export class State<T> {
  private _val: T;

  get val(): T {
    return this._val;
  }

  set val(value: T) {
    const oldVal = this._val;
    this._val = value;

    if (subs.has(this)) {
      for (const sub of subs.get(this)) {
        sub(value, oldVal);
      }
    }
  }

  constructor(initialValue: T) {
    this.val = initialValue;
  }
}

export function state<T>(initialValue: T): State<T> {
  return new State<T>(initialValue);
}

export function subscribe<T>(
  s: State<T>,
  fn: StateSubscriptionFn<T>
): () => void {
  if (subs.has(s)) {
    subs.get(s).add(fn);
  } else {
    const tmp = new Set<StateSubscriptionFn<T>>();
    tmp.add(fn);
    subs.set(s, tmp);
  }

  return () => {
    subs.get(s).delete(fn);
  };
}

export class View<T extends HTMLElement> {
  private unsubs: (() => void)[];

  constructor(
    public el: T,
    public onEnter?: () => void,
    public onExit?: () => void
  ) {
    this.el = el;
  }

  addUnsub(unsub: () => void): void {
    this.unsubs.push(unsub);
  }

  unsubAll(): void {
    for (const unsub of this.unsubs) {
      unsub();
    }
  }
}

export type Component<Props> = (props?: Props, children?: Children) => Element;

type Child = HTMLElement;
type Children = string | null | Child | Child[];
type HTMLElementStyle = {
  [x in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[x];
};
type LifecycleFns = {
  onEnter?: () => void;
  onExit?: () => void;
};
type Attrs<T extends HTMLElement> = (
  | { [x in keyof T]?: T[x] }
  | { style?: HTMLElementStyle }
) &
  LifecycleFns;

export function createHTMLElement<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  attrs?: Attrs<T>,
  children?: Children
): T {
  const r = document.createElement(tag) as T;

  if (attrs !== undefined) {
    const keys = Object.keys(attrs);

    for (const k of keys) {
      if (k === "style") {
        const sks = Object.keys(attrs.style);

        for (const sk of sks) {
          r.style[sk] = attrs.style[sk];
        }
      } else {
        r[k] = attrs[k];
      }
    }
  }

  if (!children) return r;

  if (typeof children === "string") {
    r.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach(x => r.append(x));
  } else {
    r.append(children);
  }

  return r;
}

export function createComponentElement<Props>(
  component: Component<Props>,
  props?: Props,
  children?: Children
): Element {
  const r = component(props, children);

  return r;
}

export function createElement<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  attrs?: Attrs<T>,
  children?: Children
): T;
export function createElement<Props>(
  component: Component<Props>,
  props?: Props,
  children?: Children
): Element;
export function createElement<Props, T extends HTMLElement>(
  ec: keyof HTMLElementTagNameMap | Component<Props>,
  attrs?: Attrs<T> | Props,
  children?: Children
): T | Element {
  if (typeof ec === "function") {
    return createComponentElement<Props>(ec, attrs as Props, children);
  } else {
    return createHTMLElement<T>(ec, attrs as Attrs<T>, children);
  }
}

export function mount(el: HTMLElement, parent: HTMLElement): void {
  // TODO
}

export function unmount(el: HTMLElement, parent: HTMLElement): void {
  // TODO
}
