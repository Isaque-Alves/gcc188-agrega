import React from "react";
import { useLocation } from "react-router-dom";

import menu from "./menu";

function GetCurrentMenuTitle(props) {
  const location = useLocation();

  const handleGetTitle = () => {
    const path = location.pathname.toLowerCase().split("/");
    const selected = menu.filter((m) => `/${path[1]}/${path[2]}` == m.link);

    return (selected.length && selected[0].name) || "";
  };

  return <div>{handleGetTitle()}</div>;
}

export default GetCurrentMenuTitle;
