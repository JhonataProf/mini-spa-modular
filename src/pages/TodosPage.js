// src/pages/TodosPage.js
import { h } from '../core/h.js';
import { useState, useEffect } from '../core/hooks.js';

export function TodosPage() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let alive = true;
    const id = setTimeout(() => {
      if (!alive) return;
      setTodos([
        { id: 2, title: 'Implementar useState' },
        { id: 1, title: 'Estudar Virtual DOM' },
        { id: 3, title: 'Criar Router com History API' },
      ]);
      setLoading(false);
    }, 600);
    return () => { alive = false; clearTimeout(id); };
  }, []);

  return h('div', null,
    h('h2', null, 'Todos (dados simulados)'),
    loading
      ? h('p', null, 'Carregando...')
      : h('ul', { className: 'card' },
          todos.map(t => h('li', { key: t.id, style: 'margin:6px 0;' }, '• ', t.title))
        ),
    h('small', { className: 'muted' }, 'Chaves em listas (reconciliação simplificada).')
  );
}
