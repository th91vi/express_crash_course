const moment = require('moment')
// declara middleware
const logger = (req, res, next) => {
   // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`); // retorna 'http://localhost:5000/api/members'
   console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`); 
   // retorna abaixo:
   // http://localhost:5000/: 2020-01-20T16:24:17-02:00
   // http://localhost:5000/css/app.css: 2020-01-20T16:24:17-02:00
   next();
 }

 module.exports = logger;