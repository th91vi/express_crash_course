const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// // inicia middleware
// app.use(logger);

// middleware body parser
app.use(express.json());
// linha abaixo trata encoded data de forms
app.use(express.urlencoded({
   extended: false
}));

// declara diretorio estatico
// use() eh metodo nativo de 'node'
// metodo 'static' lida com headers que definem tipo dos arquivos requisitados, cache e outros; definidos no parametro 'options'
// ver http://expressjs.com/en/api.html#express.static
// express.static(root, [options])
app.use(express.static(path.join(__dirname, 'public')));

// route da api de members
app.use('/api/members', require('./routes/api/members'));

// // declara como o servidor lida com get para '/'
// // abaixo estao sendo usadas req e res de 'express', nao as nativas de 'node'
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// define port, a receber e enviar, requisicoes e respostas, como a definia pelo ambiente, ou porta 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));