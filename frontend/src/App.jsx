import './App.css'
import ondas from './assets/ondas.png'
import { useState } from 'react'

function App() {

  const [nome, setNome] = useState('')

  const [mensagem, setMensagem] = useState('')

  const confirmarPresenca = async () => {
    if (nome.trim() === '') {
    setMensagem('Digite seu nome e sobrenome.')
    return
  }
    const resposta = await fetch('https://casamento-github.a8kmoe.easypanel.host/confirmar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome
    })
  });

  const respostaServidor = await resposta.text()

  setMensagem(respostaServidor)

  setTimeout(() => {
  window.location.href =
    `http://127.0.0.1:5500/index.html?confirmado=${encodeURIComponent(nome)}`
}, 3000)
}

  return (
    <>
      <div className="monograma">
        <span>C</span>
        <span className="linha">|</span>
        <span>G</span>
      </div>

      <div className='card'>

        <h1>Confirmação de Presença</h1>

        <input type="text" 
              placeholder="Nome e Sobrenome:" 
              value={nome} 
              onChange={(event) => setNome(event.target.value)} />

        <button onClick={confirmarPresenca}>
          CONFIRMAR PRESENÇA
        </button>

        {mensagem && <p className="mensagem">{mensagem}</p>}

      </div>

      <img src={ondas} className='ondas' alt="" />
    </>
  )
}

export default App