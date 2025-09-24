# Mini SPA 2.0 (Modular)
Projeto didático para explicar como um SPA (como o React) funciona por baixo dos panos.

**Conceitos incluídos**
- DOM virtual e renderização
- Diff/Patch com suporte simples a `key` em listas
- Hooks: `useState` e `useEffect` (com deps e cleanup)
- Roteamento com History API (sem `#`)
- Props, estado, composição de componentes
- Formulário controlado (inputs ↔ estado)

## Estrutura
```
.
├─ index.html
└─ src
   ├─ main.js
   ├─ app.js
   ├─ core
   │  ├─ h.js
   │  ├─ dom.js
   │  ├─ diff.js
   │  ├─ hooks.js
   │  └─ router.js
   ├─ components
   │  ├─ Counter.js
   │  ├─ HelloCard.js
   │  └─ Nav.js
   └─ pages
      ├─ Home.js
      ├─ Sobre.js
      ├─ TodosPage.js
      └─ FormPage.js
```

## Como rodar
> Por usar History API, fazer refresh em uma rota “profunda” (ex.: `/sobre`) requer um servidor que redirecione `/*` para `index.html`.

### Opção 1 — Simples (navegue a partir de `/`)
1. Clique em **Início** e use os links. Evite dar refresh fora da home.

### Opção 2 — Servidor local com redirecionamento
- Usando `serve` (Node):
  ```bash
  npx serve -s .
  ```
  O `-s` habilita single-page mode.

- Usando `http-server`:
  ```bash
  npx http-server -P http://localhost:8080? .
  ```
  (ou configure reescritas compatíveis).

- Vite (apenas para servir):
  ```bash
  npm create vite@latest mini-spa -- --template vanilla
  # copie / substitua os arquivos deste projeto
  npm run dev
  ```

## Pontos para demonstrar em aula
- Abra o console e mostre os logs do `useEffect`/cleanup no `Counter`.
- Em **Todos**, altere a ordem dos itens (troque os `id`s) e explique por que as `key`s importam.
- No **Form**, digite e mostre o preview em tempo real (estado → UI).

Bom estudo! ✨
# mini-spa-modular
