import './App.css'
import ondas from './assets/ondas.png'
import { useState } from 'react'

function App() {

  const [nome, setNome] = useState('')

  const [mensagem, setMensagem] = useState('')


const confirmarPresenca = async () => {
  if (nome.trim() === '') {
    setMensagem('Digite seu nome e sobrenome.');
    return;
  }

  try {
    const resposta = await fetch(
      'https://casamento-github.a8kmoe.easypanel.host/confirmar',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome.trim()
        })
      }
    );

    const respostaServidor = await resposta.text();
    setMensagem(respostaServidor);

    if (!resposta.ok) {
      return;
    }

    setTimeout(() => {
      window.location.href =
        `https://nosso-sim.netlify.app/?confirmado=${encodeURIComponent(nome.trim())}`;
    }, 3000);

  } catch (erro) {
    setMensagem('Não foi possível confirmar. Tente novamente.');
    console.error(erro);
  }
};

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

export default App