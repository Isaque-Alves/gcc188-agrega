export default (link) => {
  let linkArray = link.split("/");
  let windowArray = window.location.pathname.split("/");
  if (
    window.location.pathname == link ||
    (windowArray.length == linkArray.length && windowArray[1] == linkArray[1])
  ) {
    return true;
  }
  return false;
};
