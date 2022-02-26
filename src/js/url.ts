const hostingUrl = 'github.io';
const reposName = 'willberries';

export const getPath = () => {
  let path: string = "";

  if (window.location.hostname.includes(hostingUrl)) {
    path = "/" + reposName + "/goods.html";
  } else {
    path = "/goods.html";
  }
  return path;
}

export const setHref = (hrefToSet: string) => {
  
  let newHref: string = "";
  if (window.location.hostname.includes(hostingUrl)) {
    newHref = "/" + reposName + hrefToSet;
  } else {
    newHref = hrefToSet;
  }
  
  window.location.href = newHref;
}

export const updateUrl = () => {

}
