import { Link, BlitzPage, Routes, Image } from "blitz"

import CryptoMiningLogo from "app/assets/svg/crypto-mining.svg"
import CimeLogo from "app/assets/svg/cime.svg"
import { makeStyles } from 'integrations/material-ui'

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Button from "app/core/components/shared/Button"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"

const styles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(4)
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  heading: {
    textAlign: "center",
    textTransform: 'capitalize'
  },
  subHeading: {
    textTransform: "capitalize"
  },
}));

const LoggedOutLayout: BlitzPage = (props) => {
  const classes = styles();
  return (
    <ConsumerContainer className={classes.root}>
      <Image alt="Landing page logo" src={CimeLogo} />
      <Typography
        variant="h3"
        className={classes.heading}
      >
        Improve buying crypto<br /> with coinbase
      </Typography>
      <Typography variant="caption" className={classes.subHeading}>
        *Not affiliated with coinbase
      </Typography>

    <Link href="/api/auth/coinbase">
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        >
          Get Started
        </Button>
      </Link>
    </ConsumerContainer>
  )
}

LoggedOutLayout.getLayout = (page) => <Layout title="Logged In">{page}</Layout>

export default LoggedOutLayout
