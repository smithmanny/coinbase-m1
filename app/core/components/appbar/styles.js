import { makeStyles } from 'integrations/material-ui'

export default makeStyles((theme) => ({
  accountFab: {
    backgroundColor: "transparent",
  },
  close: {
    marginBottom: theme.spacing(2),
  },
  checkoutBtn: {
    borderRadius: 0,
    color: "white",
    marginTop: theme.spacing(2),
    width: "100%",
  },
  orderTotal: {
    marginLeft: "auto",
  },
  iconButton: {
    color: "#000",
  },
  root: {
    position: "relative",
    background: "transparent",
    boxShadow: "none",
    padding: 0,
    marginTop: theme.spacing(2),
  },
  logo: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "& h5": {
      fontWeight: "700",
    },
  },
  login: {
    marginLeft: theme.spacing(1),
  },
  linksSection: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modal: {
    position: "absolute",
    padding: theme.spacing(2),
    borderRadius: 0,
    right: theme.spacing(1),
    top: theme.spacing(8),
    zIndex: 999,
    maxWidth: "325px",
    width: "100%",
    "& a": {
      textDecoration: "none",
    },
    "& .chef": {
      fontWeight: "500",
    },
  },
  profileName: {
    marginLeft: theme.spacing(1),
    fontWeight: "550",
    "& a": {
      color: "#000",
      textDecoration: "none",
    },
  },
}));
