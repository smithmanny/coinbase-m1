import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTokensInput
  extends Pick<
  Prisma.TokenFindManyArgs,
  "where" | "orderBy" | "skip" | "take"
  > { }

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTokensInput) => {
    const {
      items: tokens,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.token.count({ where }),
      query: (paginateArgs) =>
        db.token.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      tokens,
      nextPage,
      hasMore,
      count,
    }
  }
)