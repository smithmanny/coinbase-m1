import { Ctx, AuthenticationError } from "blitz"

import {
  fetchCoinbaseApi,
  CoinbaseAccountType,
  CoinbaseAccountDataType } from "app/utils/coinbaseHelpers"

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