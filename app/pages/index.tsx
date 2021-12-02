import { dynamic, BlitzPage, useQuery, SessionContext } from "blitz"

import Layout from "app/core/layouts/Layout"
import { CoinbaseAccountType } from "app/utils/coinbaseHelpers"
import getCurrentUserQuery from "app/users/queries/getCurrentUser";

interface WalletType {
  accountsWithBalance: CoinbaseAccountType[]
  allAccounts: CoinbaseAccountType[]
}
interface PagePropType {
  session: SessionContext
  wallets: WalletType
  userId: string | null
}

const LoggedInLayout = dynamic(() =>
  import("app/core/layouts/LoggedInLayout")
);
const LoggedOutLayout = dynamic(() =>
  import("app/core/layouts/LoggedOutLayout")
);

const Home: BlitzPage<PagePropType> = () => {
  const [user] = useQuery(getCurrentUserQuery, undefined);

  if (user) {
    return <LoggedInLayout />
  }
  return (
    <LoggedOutLayout />
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
