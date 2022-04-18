import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Hidden, Grid, CssBaseline } from "@mui/material";

import SidebarMobile from "./SidebarMobile";
import SidebarWeb from "./SidebarWeb";

const drawerWidth = 80;

const styles = () => ({
  drawer: {
    backgroundColor: "#0909",
    // [theme.breakpoints.up("sm")]: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    // },
  },
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <CssBaseline />
        <Grid className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            {/* <SidebarMobile /> */}
          </Hidden>
          <Hidden xsDown implementation="css">
            <SidebarWeb />
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Sidebar);
