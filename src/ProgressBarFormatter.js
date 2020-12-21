import React from "react";
import {
  Grid,
  LinearProgress,
  makeStyles,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  bar: {
    height: 24
  },
  label: {}
}));

const SdgFormatter = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <LinearProgress
          className={classes.bar}
          color="primary"
          variant="determinate"
          value={props.value}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography color="primary" className={classes.label} variant="body1">
          {`${props.value}%`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SdgFormatter;
