const crypto = require( 'crypto' )
const SECRET = '53737335s3kr3t'

function valid( email ) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 	return re.test( email )
}

function generate( email ) {
	return (! valid( email ) ) ?
		new Error( `ínvalid email: ${email}` )
		:
		crypto.createHash('sha256')
			.update( SECRET )
			.update( email )
			.digest( 'hex' )
}

module.exports = generate
