type Child = HTMLElement | SVGElement;
type Children = string | null | Child | Child[];

export function el<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  attrs: { [x in keyof T]?: T[x] },
  children?: Children
): T {
  const el = document.createElement(tag) as T;

  const keys = Object.keys(attrs);

  for (const k of keys) {
    el[k] = attrs[k];
  }

  if (!children) return el;

  if (typeof children === "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    children.forEach(x => el.append(x));
  } else {
    el.append(children);
  }

  return el;
}
