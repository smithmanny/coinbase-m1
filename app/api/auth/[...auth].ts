import { passportAuth } from "blitz"
const CoinbaseStrategy = require('passport-coinbase').Strategy;

import db from "db"

interface ProfileInterface {
  displayName: string,
  emails: [any],
}

export default passportAuth((context) => ({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      authenticateOptions: {
        scope: "wallet:accounts:read,wallet:addresses:read,wallet:buys:create,wallet:payment-methods:read,wallet:payment-methods:limits,wallet:user:read,wallet:user:email",
      },
      strategy: new CoinbaseStrategy({
        account: 'all',
        clientID: process.env.BLITZ_PUBLIC_COINBASE_CLIENT_ID,
        clientSecret: process.env.BLITZ_PUBLIC_COINBASE_CLIENT_SECRET,
        callbackURL: `${process.env.BLITZ_PUBLIC_SITE_CALLBACK_URL}`,
        includeEmail: true,
      },
        async function (accessToken, refreshToken, profile: ProfileInterface, done) {
          const email = profile.emails && profile.emails[0]?.value
          if (!email) {
            // This can happen if you haven't enabled email access in your coinbase app permissions
            return done(
              new Error("Coinbase OAuth response doesn't have email.")
            )
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
              role: email === "shakhorsmith@gmail.com" ? "ADMIN" : "USER"
            },
            update: {
              email,
            },
          })

          const publicData = {
            userId: user.id,
            role: user.role,
            source: "coinbase",
            accessToken,
            refreshToken
          }

          done(undefined, { publicData })
        }
        )
    },
  ],
}))