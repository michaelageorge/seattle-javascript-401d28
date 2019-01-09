'use strict';

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./db/db.json')
const middlewares = jsonServer.defaults()

// Custom
router.render = (req, res) => {
  res.jsonp({ 
    count: res.locals.data.length,
    results: res.locals.data
  })
};

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
