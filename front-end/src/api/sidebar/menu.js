import home from "../../assets/icons/home.svg";
import homeSelected from "../../assets/icons/homeSelected.svg";

import grupo from "../../assets/icons/grupo.svg";
import grupoSelected from "../../assets/icons/grupoSelected.svg";

import link from "../../assets/icons/link.svg";
import linkSelected from "../../assets/icons/linkSelected.svg";

import user from "../../assets/icons/user.svg";
import userSelected from "../../assets/icons/userSelected.svg";

const menu = [
  {
    key: "index",
    name: "Início",
    icon: home,
    iconSelected: homeSelected,
    link: "/home",
    disabled: false,
    show: true,
  },
  {
    key: "group",
    name: "Grupos",
    icon: grupo,
    iconSelected: grupoSelected,
    link: "/grupo/:id",
    disabled: true,
    show: true,
  },
  {
    key: "links",
    name: "Links",
    icon: link,
    iconSelected: linkSelected,
    link: "/grupo/:id/link/:lid",
    disabled: true,
    show: true,
  },
  {
    key: "user",
    name: "Usuários",
    icon: user,
    iconSelected: userSelected,
    link: "/usuario",
    disabled: false,
    show: true,
  },
];

export default menu;
