import React from 'react'
import { BlitzPage, Routes, Link } from "blitz"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import styles from './styles';
import { CoinbaseAccountType } from "app/utils/coinbaseHelpers"

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"
import Button from "app/core/components/shared/Button"

interface WalletType {
  accountsWithBalance: CoinbaseAccountType[]
  allAccounts: CoinbaseAccountType[]
}

interface PageProps {
  wallets: WalletType
}

const LoggedinLayout: BlitzPage<PageProps> = (props) => {
  const classes = styles();
  const { wallets } = props;
  return (
    <React.Fragment>
      <ConsumerContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.startTransferButtonContainer}>
            <Link href={Routes.CreateBuy()}>
              <Button
                size="large"
                color="primary"
                className={classes.startTransferButton}
                >
                  Start New Transfer
                </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Your Tokens</Typography>
          </Grid>
          {wallets.accountsWithBalance.map(account => (
            <Grid key={account.id} item md={3}>
              <Card>
                <CardHeader
                  title={account.currency.code}
                  subheader={account.balance.amount}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </ConsumerContainer>
    </React.Fragment>
  )
}

LoggedinLayout.authenticate = true

export default LoggedinLayout
