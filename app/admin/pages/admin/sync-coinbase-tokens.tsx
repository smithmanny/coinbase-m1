import { BlitzPage, useMutation, getSession, invokeWithMiddleware } from "blitz"

import { makeStyles } from 'integrations/material-ui'
import uploadCoinbaseTokensMutation from "app/admin/mutations/uploadCoinbaseTokens"

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Grid from 'app/core/components/shared/Grid'
import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'
import Layout from "app/core/layouts/Layout"

const styles = makeStyles((theme) => ({
}))

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (session.$publicData.role !== 'ADMIN') {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
    return {
      props: {}
    }
}

const SyncCoinbaseTokens: BlitzPage = (props) => {
  const classes = styles();
  const [uploadCoinbaseTokens] = useMutation(uploadCoinbaseTokensMutation)
  return (
    <ConsumerContainer>
      <Button onClick={() => uploadCoinbaseTokens()}>Sync Tokens</Button>
    </ConsumerContainer>
  )
}

SyncCoinbaseTokens.authenticate = { redirectTo: '/' }
SyncCoinbaseTokens.getLayout = (page) => <Layout>{page}</Layout>

export default SyncCoinbaseTokens
