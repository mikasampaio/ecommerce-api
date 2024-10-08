export default {
  secret: process.env.TOKEN_SECRET as string,
  expiresIn: '5d',
};
