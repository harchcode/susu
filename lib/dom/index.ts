type Child = HTMLElement | SVGElement;
type Children = string | null | Child | Child[];

export type HTMLElementStyle = {
  [x in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[x];
};

export function el<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  attrs?: { [x in keyof T]?: T[x] } | { style?: HTMLElementStyle },
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
