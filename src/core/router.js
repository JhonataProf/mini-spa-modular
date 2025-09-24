// src/core/router.js
export const Router = {
  base: '',
  getPath() {
    let p = location.pathname;
    if (this.base && p.startsWith(this.base)) p = p.slice(this.base.length);
    return p || '/';
  },
  onChange(cb) { window.addEventListener('popstate', cb); },
  linkTo(path) {
    return (e) => {
      e.preventDefault();
      const target = path.startsWith('/') ? path : '/' + path;
      if (this.getPath() !== target) {
        history.pushState({}, '', this.base + target);
        cbMicrotask();
      }
    };
  }
};

// Agenda um microtask para permitir que listeners se registrem antes do render.
function cbMicrotask() {
  Promise.resolve().then(() => {
    const evt = new PopStateEvent('popstate');
    dispatchEvent(evt);
  });
}
