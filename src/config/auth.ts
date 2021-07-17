export default {
  secret_token: process.env.SECRET_KEY,
  expires_in: '1d',
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expires_in_refresh_token: '30d',
  expires_refresh_token_days: 30,
};
