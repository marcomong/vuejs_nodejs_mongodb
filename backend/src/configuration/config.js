const config = {
  app: {
    port: process.env.PORT || 8000,
    db: {
      name: process.env.DB_NAME || 'websiteName',
      password: process.env.DB_PWD || 'websitePassord',
      user: process.env.DB_USER || 'websiteUser',
      server: process.env.DB_SERVER || 'localhost:27017'
    },
  },
  security: {
    tokenLife: '10m', // 1m, 1h, 1s
    jwtSecret: process.env.JWT_SECRET || 'shhhhh',
    refreshTokenLife: '30d'
  },
}

module.exports = config