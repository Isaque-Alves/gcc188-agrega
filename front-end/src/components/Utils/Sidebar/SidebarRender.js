import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material";

import GavelIcon from "@mui/icons-material/Gavel";
import menuData from "../../../api/sidebar/menu";
import isMenuSelected from "../../../api/sidebar/isMenuSelected";

const styles = (theme) => ({
  linkBox: {
    position: "relative",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "10px 0",
    height: 64,
  },
  linkIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkIcon: {
    //backgroundColor: colors.primaryColor,
  },
  linkTextContainer: {
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
  },
  linkText: {
    fontSize: 10,
    color: "#506176",
    fontWeight: 600,
    backgroundColor: "transparent",
  },
  comingSoon: {
    position: "absolute",
    top: 5,
    left: 5,
    fontSize: 12,
  },
  comingSoonIcon: {
    fontSize: 10,
    color: "#f0f0f0",
  },
  selectedContainer: {
    backgroundColor: "#f0f0f0",
    "&:hover": {
      backgroundColor: "#f0f0f0",
      color: "#F48927",
    },
  },
  seletedText: {
    color: "#F48927",
  },
});

const LinkButton = React.forwardRef(function LinkBtn(props, ref) {
  return <Link to={props.to} {...props} innerRef={ref} />;
});

function SidebarRender(props) {
  //Configurações iniciais =============================

  const { classes } = props;

  const location = useLocation();

  //Funções=============================================

  const handleRenderIcon = (data) => {
    const { icon } = data;

    if (icon.slice(-3) === "svg") {
      return handleRenderIconByPath(data);
    }
    return handleRenderIconByMaterial(data);
  };

  const handleRenderIconByPath = (data) => {
    const icon = isMenuSelected(data.link) ? data.iconSelected : data.icon;

    return (
      <Grid className={classes.linkIconContainer}>
        <img src={icon} alt={icon} className={classes.linkIcon} />
      </Grid>
    );
  };

  const handleRenderIconByMaterial = (data) => {
    return (
      <ListItemIcon className={classes.linkIconContainer}>
        <Icon>{data.useLocationicon}</Icon>
      </ListItemIcon>
    );
  };

  const handleRenderContent = () => {
    if (menuData) {
      const menuDataShow = menuData.filter((menu) => menu.show);
      return (
        <List className={classes.linkBox}>
          {menuDataShow.map((menu) => (
            <ListItem
              className={classNames(
                classes.linkContainer,
                isMenuSelected(menu.link) ? classes.selectedContainer : null
              )}
              disabled={menu.disabled}
              component={LinkButton}
              to={menu.link}
              button
              key={menu.key}
            >
              {menu.icon && handleRenderIcon(menu)}
              <ListItemText className={classes.linkTextContainer}>
                <Typography
                  align="center"
                  className={classNames(
                    classes.linkText,
                    isMenuSelected(menu.link) ? classes.seletedText : null
                  )}
                >
                  {menu.name}
                </Typography>
              </ListItemText>
              {menu.disabled && (
                <Grid className={classes.comingSoon}>
                  <GavelIcon className={classes.comingSoonIcon} />
                </Grid>
              )}
              {isMenuSelected(menu.link) && <Grid className={classes.slider} />}
            </ListItem>
          ))}
        </List>
      );
    }

    return null;
  };

  return <div>{handleRenderContent()}</div>;
}

export default withStyles(styles)(SidebarRender);
