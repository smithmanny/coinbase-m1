import { AuthenticationError } from "blitz"
import { Queue } from "quirrel/blitz"

import {
  fetchCoinbaseApi,
  CoinbaseAccountType,
  CoinbaseAccountDataType
} from "app/utils/coinbaseHelpers"
import db from "db"

export default Queue(
  "api/uploadCoinbaseTokens", // the path of this API route
  async (accessToken: string) => {
    const fetchTokens = async (url = "accounts?limit=100", previousResult = []): Promise<CoinbaseAccountType[]> => {
      let allCoinbaseTokens

      try {
        const coinbaseAccount: CoinbaseAccountDataType = await fetchCoinbaseApi({
          method: 'GET',
          accessToken,
          route: url
        })
        allCoinbaseTokens = [...previousResult, ...coinbaseAccount.data]

        // Fetch all coinbase wallets
        if (coinbaseAccount.pagination.next_uri) {
          const nextUrl = coinbaseAccount.pagination.next_uri.replace("/v2/", "")
          fetchTokens(nextUrl, allCoinbaseTokens)
        }
      } catch (err) {
        throw new AuthenticationError()
      }

      return allCoinbaseTokens
    }

    const coinbaseTokens = await fetchTokens();
    coinbaseTokens.forEach(token => {
      db.token.create({
        data: {
          code: token.currency.code,
          name: token.currency.name
        }
      })
    })
  }
)
