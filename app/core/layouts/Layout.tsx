import { ReactNode } from "react"
import { Head } from "blitz"

import Appbar from 'app/core/components/appbar'
import Typography from "app/core/components/shared/Typography"

import { makeStyles } from 'integrations/material-ui'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const styles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
})
);

const Layout = ({ title, children }: LayoutProps) => {
  const classes = styles()
  return (
    <>
      <Head>
        <title>{title || "CIME"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />
      <main>
        {children}
      </main>
      <Typography className={classes.footer}>
        Created by <a href="https://shakhorsmith.com" target="_blank" rel="noreferrer">Shakhor Smith</a> 👨🏾‍💻
      </Typography>
    </>
  )
}

export default Layout
