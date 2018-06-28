const PORT    = 8080
const express = require( 'express' )
const app     = express()
const api     = require( './api.js' )

console.info( `Server listening on port ${PORT}` )
app.listen( PORT )
