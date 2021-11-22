import React from 'react';
import { useQuery, useMutation } from 'blitz'
import PropTypes from 'prop-types'

import { makeStyles } from 'integrations/material-ui'
import fetchPaymentMethodsQuery from "app/queries/fetchPaymentMethods"
import createBuyOrderMutation from "app/mutations/createBuyOrder"

import Form, { Checkboxes, Select, TextField } from "app/core/components/form"
import Modal from 'app/core/components/shared/Modal'
import Grid from 'app/core/components/shared/Grid'
import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'

const styles = makeStyles((theme) => ({
  root: {
    height: 700
  }
}))

const StartNewTransferModal = ({ allAccounts, show, onClose, ...props }) => {
  const classes = styles();
  const [paymentMethods] = useQuery(fetchPaymentMethodsQuery, {})
  const [createBuyOrder] = useMutation(createBuyOrderMutation)
  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="sm"
      dialogProps={{
        classes: {
          paperScrollPaper: classes.root,
        }
      }}
    >
      <Form
        initialValues={{
          selectedPaymentMethod: paymentMethods[0].id
        }}
        submitText="Submit Order"
        onSubmit={async(values) => {
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
            <Select
              name="selectedTokens"
              label="Payment Method"
              items={allAccounts.map(account => ({
                label: account.currency.code,
                value: account.id,
              }))}
              isAsync
              isMulti
            />
          </Grid>

          {/* Submit */}
          {/* <Grid item>
            <Button>Submit order</Button>
          </Grid> */}
        </Grid>
      </Form>
    </Modal>
  )
}

StartNewTransferModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default StartNewTransferModal;