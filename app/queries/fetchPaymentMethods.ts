import { Ctx } from "blitz"

import { fetchCoinbaseApi } from "app/utils/coinbaseHelpers"
import crypt from "app/utils/crypto"

export default async function fetchPaymentMethods(input, ctx: Ctx) {
  ctx.session.$authorize();

  const accessToken = crypt.decrypt(ctx.session.accessToken)
  let paymentMethods;

  try {
    const response = await fetchCoinbaseApi({ method: 'GET', accessToken, route: 'payment-methods' });
    paymentMethods = response.data.filter(pm => pm.type === "ach_bank_account" && pm.allow_buy === true)
  } catch (err) {
    throw new Error(err)
  }

  return paymentMethods
}