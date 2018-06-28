const expect = require( 'chai' ).expect

const api = {
	POST: input => 'String',
	GET:  input => 'String'
}

const PDF = String
const key = {
	valid  : String,
	invalid: String,
	expired: String
}
const email = {
	valid  : 'me@garbrand.com',
	invalid: 'you@garbrand.com'
}

describe( 'Public API', function() {
	it( 'responds to /store', function() {
		// POST  /store { PDF, email, sender } => key    // Return `success` to `sender`, in the background send `key` to `recipient`
		expect( api.POST( '/store', { data: PDF, email: email.valid, sender: email.valid } ) ).to.be.a( 'string' )
		// expect( api.POST( '/store', { data: PDF, email: email.invalid, sender: email.valid } ) ).to.be.a( 'Error' ) 
	})

	it( 'responds to /key', function() {
		// GET   /get { key } => PDF
		expect( api.GET( `/key?${key.valid}` ) ).to.be.a( 'string' )

		// GET   /key { key:expired } => html:requestKeys
		expect( api.GET( `/key?${key.expired}`) ).to.be.a( 'string' )

		// POST  /key { email:valid } => key
		expect( api.POST( `/key?${email.valid}` ) ).to.be.a( 'string' )

		// POST  /key { email:invalid } => html:error
		expect( api.POST( `/key?${email.invalid}` ) ).to.be.a( 'string' )
	})
})
