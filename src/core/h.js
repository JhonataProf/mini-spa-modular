// src/core/h.js
const isFn = (v) => typeof v === 'function';

/**
 * Cria um nó virtual. Se "type" for um componente (função),
 * invoca imediatamente e retorna a subárvore gerada.
 * Assim a árvore final contém apenas elementos nativos e TEXT.
 */
export function h(type, props, ...children) {
  props = props || {};
  const flat = [];
  children.flat(Infinity).forEach(ch => {
    if (ch == null || ch === false) return;
    if (typeof ch === 'number' || typeof ch === 'string') {
      flat.push({ type: 'TEXT', props: { nodeValue: String(ch) }, children: [], key: null });
    } else {
      flat.push(ch);
    }
  });

  if (isFn(type)) {
    return type({ ...props, children: flat });
  }
  return { type, props, children: flat, key: props.key ?? null };
}
