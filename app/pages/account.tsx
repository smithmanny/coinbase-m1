import { BlitzPage, useMutation } from "blitz"

import { Login } from "app/auth/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { makeStyles } from 'integrations/material-ui'

import Layout from "app/core/layouts/Layout"
import Button from "app/core/components/shared/Button";
import ConsumerContainer from "app/core/components/shared/ConsumerContainer";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import Form, { TextField } from "app/core/components/form"


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
      <Typography variant="h2" align="center">
        Your Account
      </Typography>
      <Form
        submitText="Update Password"
        // schema={Login}
        // initialValues={initialValues}
        // mutation={login}
        toVariables={values => ({
          ...values
        })}
      >
        <Typography variant="h6" className={classes.title}>
          <strong>Update Password</strong>
        </Typography>
          <TextField
            name="password"
            label="Current Password"
            placeholder="Current Password"
          />
          <TextField
            name="newPassword1"
            label="New Password"
            placeholder="New Password"
          />
          <TextField
            name="newPassword2"
            label="Confirm New Password"
            placeholder="Confirm New Password"
          />
      </Form>

      {/* Update Account */}
      {/* <Form
        schema={Login}
        initialValues={initialValues}
        mutation={login}
        toVariables={values => ({
          ...values
        })}
      >
        <Typography variant="h6" className={classes.title} gutterBottom>
          <strong>Personal Info</strong>
        </Typography>
        <Grid item container spacing={2}>
          <TextField
            disabled
            name="firstName"
            label="First Name"
            placeholder="First Name"
            md={6}
          />
          <TextField
            disabled
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            md={6}
          />
        </Grid>
      </Form> */}

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
