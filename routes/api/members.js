const express = require('express');
const uuid = require('uuid');
// requisita router do express
const router = express.Router();
const members = require('../../Members');

// abaixo estao sendo usadas req e res de 'express', nao as nativas de 'node'
// rota abaixo pega todos os membros
// router.get('/api/members', (req, res) => { // url absoluta agora será gerenciada por index.js
router.get('/', (req, res) => {
  // metodo 'json' se encarrega de tratar o JSON para string
  // express.json([options])
  res.json(members);
})

// pega unico member
router.get('/:id', (req, res) => {
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
});

// cria member
router.post('/', (req, res) => {
  // // resposta do servidor a receber um post, que é igual ao body do post
  // res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    street: req.body.street,
    suite: req.body.suite,
    city: req.body.city,
    zipcode: req.body.zipcode,
    lat: req.body.lat,
    lng: req.body.lng,
    phone: req.body.phone,
    website: req.body.website,
    companyName: req.body.companyName,
    companyCatchPhrase: req.body.companyCatchPhrase,
    companyBs: req.body.companyBs
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({
      msg: 'Please include a name and email'
    });
  }

  members.push(newMember);

  //responde com o array com todos os membros, incluindo o recém adcionado
  res.json(members);
});

// atualiza member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      // se id do member for igual ao passado como parametro
      if(member.id === parseInt(req.params.id)){

        // atribuição dentre campos usando destructuring
        member = { ...member, ...updMember }

        // resposta após atualização
        // abaixo, 'member:member' é o mesmo que 'member'
        res.json({msg: 'Member updated', member})
      }
    })
  } else {
    // se nao houver membro com a id especificada, manda um status 400
    res.status(400).json({
      msg: `No member with the id ${req.params.id} found...`
    });
  }
});

// apaga member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    // res.send(req.params.id); // retorna o numero da id do usuario passado na url
    // abaixo, 'req.params.id' esta dentro de um parseInt pois seu tipo inicial eh uma string
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    // se nao houver membro com a id especificada, manda um status 400
    res.status(400).json({
      msg: `No member with the id ${req.params.id} found...`
    });
  }
});

module.exports = router;