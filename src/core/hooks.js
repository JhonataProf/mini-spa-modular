// src/core/hooks.js
let hooks = [];
let hookCursor = 0;

let effects = [];
let effectCursor = 0;
let pendingEffects = [];

let _scheduleRender = () => {};

export function bindScheduler(fn) { _scheduleRender = fn; }
export function resetCursors() { hookCursor = 0; effectCursor = 0; }
export function runPendingEffects() {
  pendingEffects.forEach(idx => {
    const rec = effects[idx];
    if (!rec) return;
    if (typeof rec.cleanup === 'function') {
      try { rec.cleanup(); } catch {}
    }
    const cleanup = rec.callback?.();
    if (typeof cleanup === 'function') rec.cleanup = cleanup;
  });
  pendingEffects = [];
}

export function useState(initial) {
  const cur = hookCursor;
  hooks[cur] = hooks[cur] ?? (typeof initial === 'function' ? initial() : initial);
  function setState(next) {
    hooks[cur] = (typeof next === 'function') ? next(hooks[cur]) : next;
    _scheduleRender();
  }
  hookCursor++;
  return [hooks[cur], setState];
}

export function useEffect(callback, deps) {
  const cur = effectCursor;
  const record = effects[cur] || { deps: undefined, cleanup: null };
  const changed = !deps || !record.deps || deps.length !== record.deps.length ||
                  deps.some((d, i) => d !== record.deps[i]);
  effects[cur] = { deps, cleanup: record.cleanup, callback };
  if (changed) pendingEffects.push(cur);
  effectCursor++;
}
