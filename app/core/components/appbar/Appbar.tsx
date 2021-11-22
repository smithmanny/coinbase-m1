import { useState } from 'react';
import { Link, Routes, useSession } from "blitz";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { default as MuiAppBar } from "@material-ui/core/AppBar";

import AccountPopover from "app/core/components/accountPopover"

import styles from './styles';

const Appbar = (props) => {
  const classes = styles();
  const session = useSession();
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const isAccountOpen = Boolean(accountAnchorEl);
  const accountId = isAccountOpen ? "account-popover" : null;

  const closeAccountModal = () => {
    setAccountAnchorEl(null);
  };
  const handleAccountModalClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const renderLoggedOutLinks = () => (
    <>
      <Grid item>
        <Link href="/api/auth/coinbase">
          <Button component="a">Log In</Button>
        </Link>
      </Grid>
    </>
  );
  const renderLoggedInLinks = () => (
    <Grid item>
      <IconButton
        aria-label="cart"
        disableRipple
        onClick={handleAccountModalClick}
      >
        <PersonIcon fontSize="large" />
      </IconButton>
    </Grid>
  );
  return (
    <MuiAppBar
      position="static"
      color="primary"
      {...props}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid container item xs>
            <Link href="/">
              <a>
                <Typography variant="h5">Slyderz</Typography>
              </a>
            </Link>
          </Grid>

          <Grid container item xs={3} spacing={2} justifyContent="flex-end">
            {session.userId ? renderLoggedInLinks() : renderLoggedOutLinks()}
          </Grid>
        </Grid>

        {session.userId && (
          <AccountPopover
            id={accountId}
            open={isAccountOpen}
            onClose={closeAccountModal}
            anchorEl={accountAnchorEl}
          />
        )}
      </Toolbar>
    </MuiAppBar>
  )
};

export default Appbar;
