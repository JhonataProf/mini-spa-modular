// src/pages/Sobre.js
import { h } from '../core/h.js';

export function Sobre() {
  return h('main', null,
    h('h1', null, 'Como funciona por baixo dos panos (v2)'),
    h('div', { className: 'card' },
      h('ol', null,
        h('li', null, 'Descrevemos a UI com nós virtuais via ', h('code', null, 'h(type, props, ...children)')),
        h('li', null, 'Se for componente (função), o mini-framework chama e recebe outra subárvore virtual.'),
        h('li', null, 'Render inicial cria nós do DOM real.'),
        h('li', null, 'Ao mudar estado, geramos NOVA árvore virtual e rodamos ', h('code', null, 'diff/patch'), '.'),
        h('li', null, 'Com chaves em listas, fazemos reconciliação simplificada.'),
        h('li', null, 'O roteador usa ', h('code', null, 'history.pushState / popstate'), ' (sem #).'),
        h('li', null, h('code', null, 'useEffect'), ' roda após aplicar o patch e pode limpar no próximo ciclo.')
      )
    ),
    h('p', null, h('small', { className: 'muted' }, 'Essência do React, em versão de estudo.'))
  );
}
