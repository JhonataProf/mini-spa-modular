// src/core/dom.js
export function createDom(vnode) {
  if (vnode.type === 'TEXT') return document.createTextNode(vnode.props.nodeValue);
  const el = document.createElement(vnode.type);
  setProps(el, {}, vnode.props);
  vnode.children.forEach(child => el.appendChild(createDom(child)));
  return el;
}

export function setProps(el, oldProps, newProps) {
  for (const k in oldProps) if (!(k in newProps)) setProp(el, k, oldProps[k], null);
  for (const k in newProps) if (oldProps[k] !== newProps[k]) setProp(el, k, oldProps[k], newProps[k]);
}

export function setProp(el, key, prev, next) {
  if (key.startsWith('on') && typeof next === 'function') {
    const evt = key.slice(2).toLowerCase();
    if (prev) el.removeEventListener(evt, prev);
    el.addEventListener(evt, next);
    return;
  }
  if (key === 'className') {
    if (next == null) el.removeAttribute('class'); else el.setAttribute('class', next);
    return;
  }
  if (key === 'value' || key === 'checked' || key === 'disabled') {
    el[key] = next ?? (key === 'checked' ? false : '');
    return;
  }
  if (key === 'key') return;
  if (next == null || next === false) el.removeAttribute(key); else el.setAttribute(key, String(next));
}
