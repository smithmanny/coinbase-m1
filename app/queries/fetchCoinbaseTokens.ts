import { Ctx } from "blitz"
import db from "db"


export default async function fetchPaymentMethods(input, ctx: Ctx) {
  ctx.session.$authorize();

  const tokens = await db.token.findMany()

  return tokens
}