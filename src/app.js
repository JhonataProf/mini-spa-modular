// src/app.js
import { h } from './core/h.js';
import { Router } from './core/router.js';
import { Nav } from './components/Nav.js';
import { Home } from './pages/Home.js';
import { Sobre } from './pages/Sobre.js';
import { TodosPage } from './pages/TodosPage.js';
import { FormPage } from './pages/FormPage.js';

export function App() {
  const path = Router.getPath();
  return h('div', null,
    h(Nav, null),
    path === '/'      ? h(Home, null)
    : path === '/sobre' ? h(Sobre, null)
    : path === '/todos' ? h('main', null, h(TodosPage, null))
    : path === '/form'  ? h(FormPage, null)
    : h('main', null, h('h1', null, '404'))
  );
}
