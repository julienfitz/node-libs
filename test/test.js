const madLibs = require('../utils');
let assert = require('assert');

describe('getTemplate', function() {
  it('returns a string with a completed mad lib', function() {
    let userAnswers = ['quick', 'sleeps', 'television'];
    let value = ['The ', ' brown turtle ', ' near the fast ', '.'];
    let expectedTemplate = 'The quick brown turtle sleeps near the fast television.';
    assert.equal(madLibs.getTemplate(userAnswers, value), expectedTemplate);
  });

  it('returns the correct string when user input is at the end', function() {
    let userAnswers = ['quick', 'sleeps', 'television'];
    let value = ['The ', ' brown turtle ', ' near the fast '];
    let expectedTemplate = 'The quick brown turtle sleeps near the fast television';
    assert.equal(madLibs.getTemplate(userAnswers, value), expectedTemplate);
  });
});
