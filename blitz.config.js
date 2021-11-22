const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")

module.exports = {
  env: {
    COINBASE_CLIENT_ID: "66f3af7c87f2ef5b40fa06c1225034ffbfe79b4b77ac8ace5a8bbe60f9824046",
    COINBASE_CLIENT_SECRET: "277574df7fafcd0366a1f8746bc96af58363782ceaa352deb0956190793c1cc7"
  },
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
      sessionExpiryMinutes: 120,
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
