import React from 'react'
import { BlitzPage, Routes, Link } from "blitz"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
          <Grid item container spacing={4}>
            {wallets.accountsWithBalance.map(account => (
              <Grid key={account.id} item xs={6} sm={4} md={3}>
                <Card>
                  <CardContent>
                    <Typography align="center" variant="h6">{account.currency.code}</Typography>
                    <Typography align="center" variant="body2" gutterBottom>{account.currency.name}</Typography>
                    <Typography align="center">{account.balance.amount}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ConsumerContainer>
    </React.Fragment>
  )
}

LoggedinLayout.authenticate = true

export default LoggedinLayout
