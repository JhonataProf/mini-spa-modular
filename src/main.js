// src/main.js
import { h } from './core/h.js';
import { createDom } from './core/dom.js';
import { updateElement } from './core/diff.js';
import { Router } from './core/router.js';
import { bindScheduler, resetCursors, runPendingEffects } from './core/hooks.js';
import { App } from './app.js';

const mountNode = document.getElementById('app');
let oldTree = null;
let scheduled = false;

function renderRoot() {
  resetCursors();
  const newTree = h(App, null);

  if (!oldTree) {
    mountNode.appendChild(createDom(newTree));
  } else {
    updateElement(mountNode, oldTree, newTree, 0);
  }
  oldTree = newTree;
  scheduled = false;
  runPendingEffects();
}

function scheduleRender() {
  if (scheduled) return;
  scheduled = true;
  Promise.resolve().then(renderRoot);
}

// liga hooks ao agendador
bindScheduler(scheduleRender);

// primeiro render + navegação
renderRoot();
Router.onChange(() => scheduleRender());
