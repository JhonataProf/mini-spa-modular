// src/pages/Home.js
import { h } from '../core/h.js';
import { Counter } from '../components/Counter.js';
import { HelloCard } from '../components/HelloCard.js';

export function Home() {
  return h('main', null,
    h('h1', null, 'SPA do zero: useEffect, keys e History API'),
    h('p', null, 'Projeto didático com DOM virtual, diff/patch, roteador por History API, props, estado e formulário controlado.'),
    h(Counter, { start: 3 }),
    h('div', { className: 'gap' }),
    h(HelloCard, { nome: 'Turma SENAC', nota: 10 })
  );
}
