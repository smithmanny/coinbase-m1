import { AuthenticationError, Ctx } from "blitz"
import * as z from "zod"

import {
  fetchCoinbaseApi,
  CoinbaseAccountType,
  CoinbaseAccountDataType
} from "app/utils/coinbaseHelpers"
import db from "db"

export default async function uploadCoinbaseTokens(
  input,
  ctx: Ctx
) {
  const accessToken = ctx.session.accessToken;
  // Require user to be logged in
  ctx.session.$authorize()

  const fetchTokens = async (url = "accounts?limit=100"): Promise<void> => {
    try {
      const coinbaseAccount: CoinbaseAccountDataType = await fetchCoinbaseApi({
        method: 'GET',
        accessToken,
        route: url
      })

      coinbaseAccount.data.forEach(async(token) => {
        await db.token.upsert({
          where: {
            tokenId: token.id,
          },
          update: {},
          create: {
            code: token.currency.code,
            name: token.currency.name,
            tokenId: token.id,
          }
        })
      })

      // Fetch all coinbase wallets
      if (coinbaseAccount.pagination.next_uri) {
        const nextUrl = coinbaseAccount.pagination.next_uri.replace("/v2/", "")
        fetchTokens(nextUrl)
      }
    } catch (err) {
      throw new Error()
    }

    return
  }
  await fetchTokens()

  return
}
