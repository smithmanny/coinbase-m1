import { dynamic, BlitzPage, getSession, useSession, invokeWithMiddleware, SessionContext } from "blitz"

import fetchCoinbaseWalletsQuery from "app/queries/fetchCoinbaseWallets"
import Layout from "app/core/layouts/Layout"
import { CoinbaseAccountType } from "app/utils/coinbaseHelpers"

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

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (!session.userId) {
    return {
      props: {}
    }
  }

  try {
    const wallets = await invokeWithMiddleware(fetchCoinbaseWalletsQuery, {}, { req, res })

    return {
      props: {
        wallets,
      }
    }
  } catch (error) {
    return { props: {}}
  }
}

const Home: BlitzPage<PagePropType> = ({ wallets }) => {
  const session = useSession()

  if (session.userId) {
    return <LoggedInLayout wallets={wallets} />
  }
  return (
    <LoggedOutLayout />
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
