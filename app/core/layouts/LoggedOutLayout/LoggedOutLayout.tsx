import { Link, BlitzPage, Image } from "blitz"

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
  productHunt: {
    marginTop: theme.spacing(8)
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

      <div className={classes.productHunt}>
        <a href="https://www.producthunt.com/posts/cime?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-cime" target="_blank" rel="noreferrer">
          <Image
            alt="CIME - M1 but for Coinbase | Product Hunt"
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=321826&theme=dark"
            height={54}
            width={250}
          />
        </a>
      </div>
    </ConsumerContainer>
  )
}

LoggedOutLayout.getLayout = (page) => <Layout title="Logged In">{page}</Layout>

export default LoggedOutLayout
