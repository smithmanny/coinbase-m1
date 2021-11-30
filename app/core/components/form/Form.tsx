import { ReactNode, PropsWithoutRef } from "react"
import { AuthenticationError } from "blitz"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { FORM_ERROR } from "final-form"
import * as z from "zod"

import { makeStyles } from 'integrations/material-ui'

import Button from '../shared/Button'
import Grid from '../shared/Grid'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit?: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  mutation?: any,
  toVariables?: Function,
  onSuccess?: Function,
}

const styles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5)
  }
}))

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  mutation,
  toVariables,
  onSubmit,
  onSuccess,
  ...props
}: FormProps<S>) {
  const classes = styles();
  const _handleSubmit = async(values, form, cb) => {
    if (mutation && toVariables) {
      const variables = toVariables(values);

      try {
        await mutation(variables)
        if (typeof onSuccess === 'function') {
          return onSuccess();
        }
      } catch (error) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          // This error comes from Prisma
          return { email: "This email is already being used" }
        } else if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
        } else {
          return { [FORM_ERROR]: error.toString() }
        }
      }

      return
    }

    // If no mutation is provided use custom onSubmit function
    if (onSubmit) {
      return onSubmit(values, form, undefined);
    }

    return
  }
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={_handleSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          <Grid container>
            {children}
          </Grid>

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <Button
              color="primary"
              type="submit"
              disabled={submitting}
              className={classes.submitButton}
            >
              {submitText}
            </Button>
          )}
        </form>
      )}
    />
  )
}

export default Form
