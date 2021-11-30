const { sessionMiddleware, simpleRolesIsAuthorized, getSession} = require("blitz")
import db from "db"

module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'cime',
      isAuthorized: simpleRolesIsAuthorized,
      sessionExpiryMinutes: 120,
    }),
    async(req, res, next) => {
      const session = await getSession(req, res)
      const handle = session.$handle

      const f = await db.session.findFirst({ where: { handle }})
      console.log(f)
      return next()
    },
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
