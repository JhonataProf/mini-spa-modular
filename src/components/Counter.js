// src/components/Counter.js
import { useState, useEffect } from '../core/hooks.js';
import { h } from '../core/h.js';

export function Counter({ start = 0 }) {
  const [count, setCount] = useState(() => start);

  useEffect(() => {
    console.log('[effect] count mudou para', count);
    return () => console.log('[cleanup] count anterior:', count);
  }, [count]);

  return h('div', { className: 'card' },
    h('h2', null, 'Contador'),
    h('p', null, 'Valor: ', h('strong', null, count)),
    h('div', { className: 'row' },
      h('button', { onClick: () => setCount(c => c + 1) }, '+1'),
      h('button', { onClick: () => setCount(c => c - 1) }, '-1'),
      h('button', { onClick: () => setCount(0) }, 'Reset')
    ),
    h('small', { className: 'muted' }, 'useState + useEffect (com deps).')
  );
}
