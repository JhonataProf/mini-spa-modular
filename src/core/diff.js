// src/core/diff.js
import { setProps } from './dom.js';

export function updateElement(parent, oldVNode, newVNode, index = 0) {
  const existing = parent.childNodes[index];

  if (!oldVNode && newVNode) { parent.insertBefore(createDomShallow(newVNode), existing || null); return; }
  if (oldVNode && !newVNode) { parent.removeChild(existing); return; }
  if (!oldVNode || !newVNode) return;

  if (oldVNode.type !== newVNode.type) { parent.replaceChild(createDomShallow(newVNode), existing); return; }

  if (newVNode.type === 'TEXT') {
    if (oldVNode.props.nodeValue !== newVNode.props.nodeValue) existing.nodeValue = newVNode.props.nodeValue;
    return;
  }

  setProps(existing, oldVNode.props || {}, newVNode.props || {});

  const oldKids = oldVNode.children || [];
  const newKids = newVNode.children || [];

  const hasKey = (arr) => arr.some(c => c && c.key != null);
  const keyed = hasKey(oldKids) || hasKey(newKids);

  if (keyed) {
    // Implementação didática: se detectar keys, reconstrói a região.
    while (existing.firstChild) existing.removeChild(existing.firstChild);
    newKids.forEach(ch => existing.appendChild(createDomShallow(ch)));
    return;
  }

  const max = Math.max(oldKids.length, newKids.length);
  for (let i = 0; i < max; i++) {
    updateElement(existing, oldKids[i], newKids[i], i);
  }
}

// Cria DOM sem descer recursivamente (usado ao inserir/substituir)
function createDomShallow(vnode) {
  if (vnode.type === 'TEXT') return document.createTextNode(vnode.props.nodeValue);
  const el = document.createElement(vnode.type);
  setProps(el, {}, vnode.props || {});
  (vnode.children || []).forEach(child => el.appendChild(createDomShallow(child)));
  return el;
}
