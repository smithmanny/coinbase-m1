import { makeStyles } from 'integrations/material-ui'

export default makeStyles((theme) => ({
    iconButton: {
      padding: 10,
    },
    exploreItem: {
      display: "flex",
      "& span": {
        margin: `auto ${theme.spacing(2)}px`,
      },
    },
    card: {
      background: "transparent",
      boxShadow: "none",
      maxWidth: 308,
    },
    cardContent: {
      paddingLeft: 0,
      "& .name": {
        margin: theme.spacing(1, 1, 1, 0),
      },
    },
    cardMedia: {
      borderRadius: 10,
      height: 205,
    },
    cardMediaRoot: {
      paddingTop: theme.spacing(1),
    },
    homeContainer: {
      padding: theme.spacing(0, 2),
    },
  })
);
