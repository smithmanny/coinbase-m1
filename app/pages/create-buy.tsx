import React from 'react'
import { BlitzPage, useMutation, useQuery, Routes } from "blitz"
import InputAdornment from '@material-ui/core/InputAdornment';
import { useFormState } from 'react-final-form'
import Chip from '@material-ui/core/Chip';

import { formatter } from "app/utils/money"
import fetchPaymentMethodsQuery from "app/queries/fetchPaymentMethods"
import createBuyOrderMutation from "app/mutations/createBuyOrder"
import coinbaseTokensQuery from "app/queries/fetchCoinbaseTokens"

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Form, { Select, TextField } from "app/core/components/form"
import Grid from 'app/core/components/shared/Grid'
import Typography from 'app/core/components/shared/Typography'
import Layout from "app/core/layouts/Layout"

const TotalSummary = (props) => {
  const formState = useFormState()
  const values = formState.values;

  if (values?.selectedTokens !== undefined && values?.amount !== undefined) {
    const { amount, selectedTokens } = values;
    const tokenValue = formatter.format(amount / selectedTokens.length)
    return (
      <Grid container spacing={2}>
        {selectedTokens.map((token, i) => (
          <Grid key={i} item>
            <Chip
              label={`${token.label} • ${tokenValue}`}
            />
          </Grid>
        ))}
      </Grid>
    )
  }

  return null
}

const CreateBuy: BlitzPage = (props) => {
  const [paymentMethods] = useQuery(fetchPaymentMethodsQuery, undefined)
  const [tokens] = useQuery(coinbaseTokensQuery, undefined)
  const [createBuyOrder] = useMutation(createBuyOrderMutation)
  return (
    <ConsumerContainer maxWidth="sm">
      <Form
        initialValues={{
          selectedPaymentMethod: paymentMethods[0].id
        }}
        submitText="Submit Order"
        onSubmit={async (values) => {
          try {
            await createBuyOrder({
              ...values,
              selectedPaymentMethod: values.selectedPaymentMethod.value,
              selectedTokens: values.selectedTokens.map(token => token.value)
            })
          } catch (err) {
            console.log(err)
          }
        }}
        onSuccess={() => Routes.Home()}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6">
              <strong>Enter Amount</strong>
            </Typography>
            <TextField
              required
              name="amount"
              placeholder="100.00"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <strong>Select Payment Method</strong>
            </Typography>
            <Select
              name="selectedPaymentMethod"
              items={paymentMethods.map(method => ({
                label: method.name,
                value: method.id
              }))}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <strong>Select Tokens</strong>
            </Typography>
            <Select
              name="selectedTokens"
              items={tokens.map(token => ({
                label: token.code,
                value: token.tokenId,
              }))}
              isSearchable
              isMulti
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TotalSummary />
          </Grid>
        </Grid>
      </Form>
    </ConsumerContainer>
  )
}

CreateBuy.authenticate = { redirectTo: '/' }
CreateBuy.getLayout = (page) => <Layout>{page}</Layout>

export default CreateBuy
