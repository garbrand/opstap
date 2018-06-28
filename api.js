const express = require( 'express' )
const app     = express()

// POST  /store { PDF, email } => key    // Return `success` to `sender`, in the background send `key` to `recipient`
app.post( '/store', (req, res) => res.send('POST /store { PDF, email, sender } => key') )

// GET   /get { key } => PDF
// GET   /key { key:expired } => html:requestKeys
app.get ('/get', (req, res) => res.send('GET /get { key } => PDF') )

// POST  /key { email:valid } => key
// POST  /key { email:invalid } => html:errors
app.post('/key', (req,res) => res.send('POST /key { email:valid } => key') )

const routes = app._router.stack
  .map( layer => layer.route )
  .filter( item => typeof item !== 'undefined' )

console.info( 'Mounted the following routes\n', routes )

module.exports = app
