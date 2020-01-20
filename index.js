const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();

// // inicia middleware
// app.use(logger);

// abaixo estao sendo usadas req e res de 'express', nao as nativas de 'node'
// rota abaixo pega todos os membros
app.get('/api/members', (req, res) => {
    // metodo 'json' se encarrega de tratar o JSON para string
    // express.json([options])
    res.json(members);
})

// pega unico member
app.get('/api/members/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    // res.send(req.params.id); // retorna o numero da id do usuario passado na url
    // abaixo, 'req.params.id' esta dentro de um parseInt pois seu tipo inicial eh uma string
    res.json(members.filter(member => member.id === parseInt(req.params.id)));    
  } else {
    // se nao houver membro com a id especificada, manda um status 400
    res.status(400).json({
      msg: `No member with the id ${req.params.id} found...`
    });
  }

})

// declara diretorio estatico
// use() eh metodo nativo de 'node'
// metodo 'static' lida com headers que definem tipo dos arquivos requisitados, cache e outros; definidos no parametro 'options'
// ver http://expressjs.com/en/api.html#express.static
// express.static(root, [options])
app.use(express.static(path.join(__dirname, 'public'))); 

// // declara como o servidor lida com get para '/'
// // abaixo estao sendo usadas req e res de 'express', nao as nativas de 'node'
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// define port, a receber e enviar, requisicoes e respostas, como a definia pelo ambiente, ou porta 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));