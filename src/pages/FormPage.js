// src/pages/FormPage.js
import { h } from '../core/h.js';
import { useState, useEffect } from '../core/hooks.js';

export function FormPage() {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('ADS');
  const [idade, setIdade] = useState('');
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setEnviado(false);
    const age = Number(idade);
    if (!nome.trim()) return setErro('Informe seu nome.');
    if (!Number.isFinite(age) || age <= 0) return setErro('Informe uma idade válida.');
    setErro('');
    setEnviado(true);
  }

  useEffect(() => {
    // efeito sem deps: roda a cada render (ex.: foco, métricas, etc.)
  });

  return h('main', null,
    h('h1', null, 'Formulário Controlado'),
    h('form', { className:'card', onSubmit },
      h('div', { className:'row' },
        h('div', { style:'flex:1' },
          h('label', null, 'Nome'),
          h('div', null, h('input', {
            value: nome,
            onInput: (e) => setNome(e.target.value),
            placeholder: 'Seu nome'
          }))
        ),
        h('div', { style:'width:140px' },
          h('label', null, 'Idade'),
          h('div', null, h('input', {
            value: idade,
            onInput: (e) => setIdade(e.target.value),
            placeholder: '18',
            inputmode: 'numeric'
          }))
        ),
        h('div', { style:'width:200px' },
          h('label', null, 'Curso'),
          h('div', null,
            h('select', {
              value: curso,
              onInput: (e) => setCurso(e.target.value)
            },
              h('option', { value:'ADS' }, 'ADS'),
              h('option', { value:'DS' }, 'Desenv. de Sistemas'),
              h('option', { value:'RI' }, 'Redes de Infra')
            )
          )
        )
      ),
      h('div', { className:'gap' }),
      erro && h('p', { className:'error' }, erro),
      h('div', { className:'row' },
        h('button', { type:'submit' }, 'Enviar'),
        h('button', { type:'button', onClick: () => { setNome(''); setIdade(''); setCurso('ADS'); setErro(''); setEnviado(false);} }, 'Limpar')
      )
    ),
    h('div', { className:'gap' }),
    h('div', { className:'card' },
      h('h3', null, 'Preview (estado → UI)'),
      h('p', null, 'Nome: ', h('strong', null, nome || '—')),
      h('p', null, 'Idade: ', h('strong', null, idade || '—')),
      h('p', null, 'Curso: ', h('strong', null, curso)),
      enviado && h('p', null, '✅ Enviado com sucesso!')
    )
  );
}
