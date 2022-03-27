const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
  '376609296383-je8ejf9r7ufnka4ej40j9r8gsec786eh.apps.googleusercontent.com',
  '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',
  /**
   * To get access_token and refresh_token in server side,
   * the data for redirect_uri should be postmessage.
   * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
   */
  'postmessage'
);

exports.getProfileInfo = async (code) => {
  const r = await client.getToken(code);
  const idToken = r.tokens.id_token;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return payload;
};
