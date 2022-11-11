const jwt = require('jsonwebtoken');


function generateAccessToken(user: { id: any; }) {
  return jwt.sign({ userId: user.id }, "secret123", {
    expiresIn: '1h',
  });
}

function generateRefreshToken(user: { id: any; }, jti: any) {
  return jwt.sign({
    userId: user.id,
    jti
  }, "secret123", {
    expiresIn: '8h',
  });
}

function generateTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
}