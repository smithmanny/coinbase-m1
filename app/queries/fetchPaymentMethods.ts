import { Ctx, Middleware } from "blitz"

import { fetchCoinbaseApi, refreshTokens } from "app/utils/coinbaseHelpers"

// export const middleware: Middleware[] = [
//   async (req, res, next) => {
//     const refreshToken = res.blitzCtx.session.refreshToken
//     const [newAccessToken, newRefreshToken] = await refreshTokens(refreshToken)

//     if (!(newAccessToken || newRefreshToken)) {
//       console.log('REAUTHENICATE WITH CB')
//       res.writeHead(302, { location: "/api/auth/coinbase" }).end()
//       return;
//     }

//     console.log('REFESH TOKEN CREATED')
//     await res.blitzCtx.session.$setPublicData({ accessToken: newAccessToken, refreshToken: newRefreshToken })
//     await next()
//   },
// ]

export default async function fetchPaymentMethods(input, ctx: Ctx) {
  ctx.session.$authorize();

  const accessToken = ctx.session;
  const response = await fetchCoinbaseApi({ method: 'GET', accessToken, route: 'payment-methods'});
  const paymentMethods = response.data

  return paymentMethods
}