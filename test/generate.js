const expect = require( 'chai').expect

const generate = require( '../generate.js' )

// Test data
const email = {
	valid  : 'me@garbrand.com',
	invalid: 'you@garbrand'
}
const key = 'e2ebee3deb074550f99c8e5200248f247523e5b3339aa04825046c6fedb95fd8'

// Tests
describe( 'generate', function() {
	it( 'should generate a key for a valid email address', function() {
		expect( generate( email.valid ) ).to.equal( key )
	} )

	it( 'should return an error for an invalid email address', function() {
		expect( generate( email.invalid ) ).to.be.a('Error')
	} )
} )
