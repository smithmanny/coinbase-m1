import { Ctx } from "blitz"
import * as z from "zod"

import { fetchCoinbaseApi } from 'app/utils/coinbaseHelpers'
import { formatter } from 'app/utils/money'

const CreateBuyOrder = z
  .object({
    amount: z.number(),
    selectedTokens: z.array(z.string()),
    selectedPaymentMethod: z.string(),
  })

export default async function createBuyOrder(
  input: z.infer<typeof CreateBuyOrder>,
  ctx: Ctx
) {
  const accessToken = ctx.session.accessToken;
  const submittedOrders = [];
  // Validate input - very important for security
  const data = CreateBuyOrder.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const tokenLength = data.selectedTokens.length
  const totalAmount = formatter.format(data.amount / tokenLength)

  // data.selectedTokens.map(token => {
  //   const body = {
  //     currency: 'USD',
  //     total: totalAmount,
  //     payment_method: data.selectedPaymentMethod,
  //   }
  //   fetchCoinbaseApi('POST', accessToken, `accounts/${token}/buys`, body)
  //   .then(order => {
  //     console.log('ORDER SUBMTTED', order)
  //     submittedOrders.push(order)
  //   })
  //   .catch(err => console.log('ERROR SUBMITTING ORDERS', err))
  // })

  return submittedOrders
}