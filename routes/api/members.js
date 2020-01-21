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
      address: {
        street: req.body.address.street,
        suite: req.body.address.suite,
        city: req.body.address.suite,
        zipcode: req.body.address.zipcode,
        geo: {
          lat: req.body.address.geo.lat,
          lng: req.body.address.geo.lng
        }
      },
      phone: req.body.phone,
      website: req.body.website,
      company: {
        name: req.body.company.name,
        catchPhrase: req.body.company.catchPhrase,
        bs: req.body.company.bs
      }
    };

    if (!newMember.name || !newMember.email) {
      return res.status(400).json({msg: 'Please include a name and email'});
    }

    members.push(newMember);

    //responde com o array com todos os membros, incluindo o recém adcionado
    res.json(members);
});

module.exports = router;