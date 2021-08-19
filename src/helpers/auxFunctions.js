export const clearParams = (url, param) => {
  let p1 = url.indexOf(param)
  let p2 = url.indexOf("&", p1)
  if (p1 > -1 && p2 > -1) {
    return (url = url.slice(0, p1) + "" + url.slice(p2 + 1))
  } else {
    return url;
  }
}