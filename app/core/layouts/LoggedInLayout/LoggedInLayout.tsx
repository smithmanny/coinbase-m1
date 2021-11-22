import React, { useCallback, useState } from 'react'
import { BlitzPage, Router, useQuery } from "blitz"
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import styles from './styles';
import { CoinbaseAccountType } from "app/utils/coinbaseHelpers"

import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Grid from "app/core/components/shared/Grid"
import Typography from "app/core/components/shared/Typography"
import Button from "app/core/components/shared/Button"
import Layout from "app/core/layouts/Layout"
import StartNewTransferModal from "app/core/modals/StartNewTransferModal"

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
  const [showTransferModal, setShowTransferModal] = useState(false)
  const closeTransferModal = useCallback(() => setShowTransferModal(false), [])
  const openTransferModal = useCallback(() => setShowTransferModal(true), [])
  console.log('LOGGED IN RENDERED')
  return (
    <React.Fragment>
      <ConsumerContainer>
        <Button onClick={openTransferModal}>Start New Transfer</Button>
        <Grid container spacing={2}>
          {wallets.accountsWithBalance.map(account => (
            <Grid key={account.id} item md={4}>
              {account.currency.code} {account.balance.amount}
            </Grid>
          ))}
        </Grid>
      </ConsumerContainer>
      {/* <StartNewTransferModal
        show={showTransferModal}
        onClose={closeTransferModal}
        allAccounts={wallets.allAccounts}
      /> */}
    </React.Fragment>
  )
}

LoggedinLayout.authenticate = true

export default LoggedinLayout
