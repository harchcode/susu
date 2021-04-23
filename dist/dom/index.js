export function el(tag, attrs, children) {
    const el = document.createElement(tag);
    const keys = Object.keys(attrs);
    for (const k of keys) {
        el[k] = attrs[k];
    }
    if (!children)
        return el;
    if (typeof children === "string") {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        children.forEach(x => el.append(x));
    }
    else {
        el.append(children);
    }
    return el;
}
