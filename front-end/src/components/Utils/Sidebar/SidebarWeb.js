import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Drawer } from "@mui/material";

import SidebarRender from "./SidebarRender";

const drawerWidth = 80;

const styles = () => ({
  drawerPaper: {
    width: drawerWidth,
    marginTop: 65,
    backgroundColor: "#FFFFFF",
    borderRight: "1px solid #F5F5F5",
    // border: "none",
  },
});

class SidebarWeb extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <SidebarRender />
      </Drawer>
    );
  }
}

export default withStyles(styles)(SidebarWeb);
