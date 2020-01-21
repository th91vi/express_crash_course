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
      city: req.body.address.city,
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
        // condicional ternaria, onde se o campo atualizado foi enviado na requisição, recebe o valor atualizado; senão recebe o valor atual, não atualizando (dããã!)

        // ### consertar sintaxe


        // member.name = updMember.name ? updMember.name : member.name,
        // member.username = updMember.username ? updMember.username : member.username,
        // member.email = updMember.email ? updMember.email : member.email,
        // member.address = {
        //   street : updMember.address.street ? updMember.address.street : member.address.street,
        //   suite : updMember.address.suite ? updMember.address.suite : member.address.suite,
        //   city : updMember.address.city ? updMember.address.city : member.address.city,
        //   zipcode : updMember.address.zipcode ? updMember.address.zipcode : member.address.zipcode,
        //   geo : {
        //     lat : updMember.address.geo.lat ? updMember.address.geo.lat : member.address.geo.lat,
        //     lng : updMember.address.geo.lng ? updMember.address.geo.lng : member.address.geo.lng,
        //   }
        // },
        // member.phone = updMember.phone ? updMember.phone : member.phone,
        // member.website = updMember.phone ? updMember.phone : member.phone,
        // member.company = {
        //   name = updMember.company.name ? updMember.company.name : member.company.name,
        //   catchPhrase = updMember.company.catchPhrase ? updMember.company.catchPhrase : member.company.catchPhrase,
        //   bs = updMember.company.bs ? updMember.company.bs : member.company.bs,
        // }

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

module.exports = router;