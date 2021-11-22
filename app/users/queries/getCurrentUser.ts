import { Ctx } from "blitz"

import db from "db"

export default async function getCurrentUser(input, ctx: Ctx) {
  const userId = ctx.session.userId

  if (!userId) {
    return null;
  }

  const user = await db.user.findFirst({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}
