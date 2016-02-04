if ( typeof window === 'undefined' ) {
  require('../../app/async');
  var expect = require('chai').expect;
}

describe('async behavior', function() {
  it('you should understand how to use promises to handle asynchronicity', function(done) {
    var flag = false;
    var finished = 0;
    var total = 2;

    function finish(done) {
      if (++finished === total) { done(); }
    }	
    
    asyncAnswers.async = function(value) {
    	var flag = Promise.resolve(value);
    	return flag;
    };
    
    asyncAnswers.async(true).then(function(result) {
      flag = result;
      expect(flag).to.eql(true);
      finish(done);
    });

    asyncAnswers.async('success').then(function(result) {
      flag = result;
      expect(flag).to.eql('success');
      finish(done);
    });

    expect(flag).to.eql(false);
  });

  it('you should be able to retrieve data from the server and return a sorted array of names', function(done) {
    var url = '/data/testdata.json';
    
    asyncAnswers.manipulateRemoteData = function(url) {    	
    	return $.getJSON(url).then(function(data) {
    		var people = new Array();
    		
    		for (var i = 0; i < data.people.length; i++) {
    			people.push(data.people[i].name);
    		}
	
    		return people.sort();
	    });
    	

    };
    
    asyncAnswers.manipulateRemoteData(url).then(function(result) {
    	console.log(result)
      expect(result).to.have.length(5);
      expect(result.join(' ')).to.eql('Adam Alex Matt Paul Rebecca');
      done();
    });
  });
});
