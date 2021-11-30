import { Ctx, Middleware, getSession, AuthenticationError } from "blitz"

import {
  fetchCoinbaseApi,
  refreshTokens,
  CoinbaseAccountType,
  CoinbaseAccountDataType } from "app/utils/coinbaseHelpers"

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

export default async function fetchCoinbaseWallets(input, ctx: Ctx) {
  ctx.session.$authorize();

  const accessToken = ctx.session.accessToken

  const filterCoinbaseWallets = (balance) => {
    switch (balance) {
      case '0.0000000000':
      case '0.000000000':
      case '0.00000000':
      case '0.0000000':
      case '0.000000':
      case '0.0000':
      case '0.00':
        return false
      default:
        return true
    }
  }

  const fetchWallets = async (url = "accounts?limit=100", previousResult = []): Promise<[CoinbaseAccountType[], CoinbaseAccountType[]] | any> => {
    let allCoinbaseWallets

    try {
      const coinbaseAccount: CoinbaseAccountDataType = await fetchCoinbaseApi({
        method: 'GET',
        accessToken,
        route: url
      })
      allCoinbaseWallets = [...previousResult, ...coinbaseAccount.data]

      // Fetch all coinbase wallets
      if (coinbaseAccount.pagination.next_uri) {
        const nextUrl = coinbaseAccount.pagination.next_uri.replace("/v2/", "")
        fetchWallets(nextUrl, allCoinbaseWallets)
      }
    } catch (err) {
      throw new AuthenticationError()
    }

    const walletsWithBalance = allCoinbaseWallets.filter(wal => filterCoinbaseWallets(wal.balance.amount))

    return [walletsWithBalance, allCoinbaseWallets]
  }

  const [accountsWithBalance, allAccounts] = await fetchWallets();

  return { accountsWithBalance, allAccounts }
}