const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import { refreshTokens } from "app/utils/coinbaseHelpers"
import crypt from "app/utils/crypto"
import db from "db"

module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'cime',
      isAuthorized: simpleRolesIsAuthorized,
      sessionExpiryMinutes: 120,
    }),
    async (req, res, next) => {
      const handle = res.blitzCtx.session.$handle

      if (handle) {
        const userSession = await db.session.findFirst({ where: { handle } })

        if (userSession?.expiresAt) {
          const result = formatDistanceToNowStrict(userSession.expiresAt, { unit: "minute" }).split(' ')
          const sessionExpiresIn = Number(result[0])

          if (sessionExpiresIn <= 70) {
            try {
              const token = res.blitzCtx.session.refreshToken
              const refreshToken = crypt.decrypt(token)
              const [newAccessToken, newRefreshToken] = await refreshTokens(refreshToken)
              const hashedAccessToken = crypt.encrypt(newAccessToken)
              const hashedRefreshToken = crypt.encrypt(newRefreshToken)

              await res.blitzCtx.session.$setPublicData({ accessToken: hashedAccessToken, refreshToken: hashedRefreshToken })
            } catch (error) {
              await res.blitzCtx.session.$revoke()
              throw new Error(error)
            }
          }
        }
      }

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
