// src/components/Nav.js
import { Router } from '../core/router.js';
import { h } from '../core/h.js';

export function Nav() {
  const path = Router.getPath();
  const Link = ({ to, children }) =>
    h('a', {
      href: to,
      onClick: Router.linkTo(to),
      className: path === to ? 'active' : ''
    }, children);

  return h('header', null,
    h('strong', null, 'Mini-SPA 2.0'),
    h(Link, { to: '/' }, 'Início'),
    h(Link, { to: '/sobre' }, 'Sobre'),
    h(Link, { to: '/todos' }, 'Todos'),
    h(Link, { to: '/form' }, 'Form')
  );
}
