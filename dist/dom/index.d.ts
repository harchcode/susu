declare type Child = HTMLElement | SVGElement;
declare type Children = string | null | Child | Child[];
export declare function el<T extends HTMLElement>(tag: keyof HTMLElementTagNameMap, attrs: {
    [x in keyof T]?: T[x];
}, children?: Children): T;
export {};
