import { Link } from "blitz"
import Button from "app/core/components/shared/Button"
import { makeStyles } from 'integrations/material-ui'

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
})
);

const ReauthenicateCoinbase = (props) => {
  const classes = styles()
  return (
    <div className={classes.root}>
      <Link href="/api/auth/coinbase">
        <Button color="primary" size="large">Re-link with coinbase</Button>
      </Link>
    </div>
  )
}

export default ReauthenicateCoinbase