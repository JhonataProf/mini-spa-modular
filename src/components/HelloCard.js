// src/components/HelloCard.js
import { h } from '../core/h.js';

export function HelloCard({ nome, nota }) {
  return h('div', { className: 'card' },
    h('h2', null, 'Props & Composição'),
    h('p', null, 'Olá, ', h('strong', null, nome), '! Sua nota é ', h('code', null, nota)),
    h('small', { className: 'muted' }, 'Componente só-visual lendo props.')
  );
}
