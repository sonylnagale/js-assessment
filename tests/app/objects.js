if ( typeof window === 'undefined' ) {
  require('../../app/objects');
  var expect = require('chai').expect;
}

describe('objects and context', function() {
  var a;
  var b;
  var C;

  beforeEach(function() {
    a = {
      name : 'Matt',
      greeting : 'Hello',
      sayIt : function() {
        return  this.greeting + ', ' +
                this.name + '!';
      }
    };

    b = {
      name : 'Rebecca',
      greeting : 'Yo'
    };

    C = function(name) {
      this.name = name;
      return this;
    };
  });

  it('you should be able to alter the context in which a method runs', function() {
      // define a function for fn so that the following will pass
	  objectsAnswers.alterContext = function(a, b) {
			b.sayIt = a;
			return b.sayIt();
	  };
	  
    expect(objectsAnswers.alterContext(a.sayIt, b)).to.eql('Yo, Rebecca!');
  });

  it('you should be able to alter multiple objects at once', function() {
    // define a function for fn so that the following will pass
    var obj1 = new C('Rebecca');
    var obj2 = new C('Melissa');
    var greeting = 'What\'s up';

    objectsAnswers.alterObjects = function(C, greeting) {
    	C.prototype.greeting = greeting;
    	return C;
    };
    
    objectsAnswers.alterObjects(C, greeting);

    expect(obj1.greeting).to.eql(greeting);
    expect(obj2.greeting).to.eql(greeting);
    expect(new C('Ellie').greeting).to.eql(greeting);
  });

  it('you should be able to iterate over an object\'s "own" properties', function() {
    // define a function for fn so that the following will pass
    var C = function() {
      this.foo = 'bar';
      this.baz = 'bim';
    };

    C.prototype.bop = 'bip';

    var obj = new C();
    
    objectsAnswers.iterate = function(obj) {
    	var response = new Array();
    	
    	for (var property in obj) {
    		if (obj.hasOwnProperty(property)) {
        		response.push(property + ": " + obj[property]);
    		}
    	}
    	
    	return response;
    };
    
    expect(objectsAnswers.iterate(obj)).to.eql([ 'foo: bar', 'baz: bim' ]);
  });
});
