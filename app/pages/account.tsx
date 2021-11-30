import { BlitzPage } from "blitz"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { makeStyles } from 'integrations/material-ui'

import Layout from "app/core/layouts/Layout"
import Button from "app/core/components/shared/Button";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Typography from "app/core/components/shared/Typography";

const styles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(6)
  }
}));

const Account: BlitzPage = () => {
  const classes = styles();
  const user = useCurrentUser();

  return (
    <ConsumerContainer maxWidth="sm">
      {/* Delete Account */}
      <Typography variant="h6" className={classes.title} gutterBottom>
        <strong>Delete Your Account</strong>
      </Typography>
      <Button
        color="red"
        variant="text"
      >
        Delete Account
      </Button>
    </ConsumerContainer>
  )
}

Account.authenticate = { redirectTo: '/' }
Account.getLayout = (page) => <Layout>{page}</Layout>

export default Account;
