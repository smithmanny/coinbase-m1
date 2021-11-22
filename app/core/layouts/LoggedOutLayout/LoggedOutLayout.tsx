import { Link, BlitzPage, Routes } from "blitz"

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"

import Button from "app/core/components/shared/Button"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

const LoggedOutLayout: BlitzPage = (props) => {
  return (
    <ConsumerContainer>
      <Typography>Coinbase</Typography>
    </ConsumerContainer>
  )
}

LoggedOutLayout.getLayout = (page) => <Layout title="Logged In">{page}</Layout>

export default LoggedOutLayout
