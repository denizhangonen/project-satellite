const jwt = require('jsonwebtoken');

exports.TOKEN_SECRET = 'test';

exports.generateToken = (email, userId) => {
  const token = jwt.sign({ email: email, userId: userId }, this.TOKEN_SECRET, {
    expiresIn: '9999h',
  });
  return token;
};

exports.participationTokenForQuickQuote = (quoteId, participantId, email) => {
  const token = jwt.sign({ quoteId, participantId, email }, this.TOKEN_SECRET, {
    expiresIn: '999999h',
  });
  return token;
};
