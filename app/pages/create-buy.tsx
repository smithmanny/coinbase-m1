import { BlitzPage, useMutation, useQuery, invokeWithMiddleware } from "blitz"

import { makeStyles } from 'integrations/material-ui'
import fetchPaymentMethodsQuery from "app/queries/fetchPaymentMethods"
import createBuyOrderMutation from "app/mutations/createBuyOrder"

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Form, { Checkboxes, Select, TextField } from "app/core/components/form"
import Grid from 'app/core/components/shared/Grid'
import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'
import Layout from "app/core/layouts/Layout"

interface PagePropType {
  paymentMethods: any
}

const styles = makeStyles((theme) => ({
}))

// export const getServerSideProps = async ({ req, res }) => {
//   const paymentMethods = await invokeWithMiddleware(fetchPaymentMethodsQuery, {}, { req, res })
//     return {
//       props: {
//         paymentMethods,
//       }
//     }
// }

const CreateBuy: BlitzPage<PagePropType> = (props) => {
  const classes = styles();
  const [createBuyOrder] = useMutation(createBuyOrderMutation)
  const [paymentMethods] = useQuery(fetchPaymentMethodsQuery, undefined)
  return (
    <ConsumerContainer>
      <Form
        initialValues={{
          selectedPaymentMethod: paymentMethods[0].id
        }}
        submitText="Submit Order"
        onSubmit={async (values) => {
          try {
            console.log("SUBMITTING")
            await createBuyOrder({
              ...values,
            })
          } catch (err) {
            console.log(err)
          }
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              <strong>Select Payment Source</strong>
            </Typography>
            <Select
              name="selectedPaymentMethod"
              label="Payment Method"
              items={paymentMethods.map(method => ({
                label: method.name,
                value: method.id
              }))}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              <strong>Enter Amount</strong>
            </Typography>
            <TextField
              name="amount"
              placeholder="100.00"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              <strong>Select Tokens</strong>
            </Typography>
          </Grid>

          {/* Submit */}
          {/* <Grid item>
              <Button>Submit order</Button>
            </Grid> */}
        </Grid>
      </Form>
    </ConsumerContainer>
  )
}

CreateBuy.getLayout = (page) => <Layout>{page}</Layout>

export default CreateBuy
