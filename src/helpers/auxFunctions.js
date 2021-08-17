export const clearParams = (url, parametro) => {
  let p1 = url.indexOf(parametro)
  let p2 = url.indexOf("&", p1)
  if (p1 > -1 && p2 > -1) {
    return (url = url.slice(0, p1) + "" + url.slice(p2 + 1))
  } else {
    return url;
  }
}