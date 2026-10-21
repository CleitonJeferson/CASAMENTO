const cors = require('cors')
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./casamento.db')

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Servidor funcionando!')
})

app.post('/confirmar', (req, res) => {
  const nome = req.body.nome.trim()

  db.get(
    'SELECT * FROM confirmacoes WHERE LOWER(nome) = LOWER(?)',
    [nome],
    (erro, pessoa) => {

      if (erro) {
        console.log(erro)
        return res.status(500).send('Erro ao verificar presença')
      }

      if (pessoa) {
        return res.send('Essa presença já foi confirmada!')
      }

      db.run(
        'INSERT INTO confirmacoes (nome) VALUES (?)',
        [nome],
        function (erro) {

          if (erro) {
            console.log(erro)
            return res.status(500).send('Erro ao salvar presença')
          }

          console.log('Presença salva:', nome)
          res.send('Presença confirmada!')
        }
      )
    }
  )
})

app.get('/confirmados', (req, res) => {

  db.all('SELECT * FROM confirmacoes', (erro, pessoas) => {

    if (erro) {
      console.log(erro)
      return res.status(500).send('Erro ao buscar confirmações')
    }

    let lista = ''

    pessoas.forEach(pessoa => {
      lista += `${pessoa.id} - ${pessoa.nome}<br>`
    })

    res.send(lista)
  })

})

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

db.run(`
  CREATE TABLE IF NOT EXISTS confirmacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  )
`)