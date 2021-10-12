export const clearParams = (url, param) => {
  let p1 = url.indexOf(param)
  let p2 = url.indexOf("&", p1)
  let flag = url.charAt(p1 - 1) === '_'
  if (flag) {
    p1 = url.indexOf(param, p1 + 1)
    p2 = url.indexOf("&", p1)
  }
  if (p1 > -1 && p2 > -1) {
    return (url = url.slice(0, p1) + "" + url.slice(p2 + 1))
  } else {
    return url;
  }
}

export const seekParam = (text, param) => {
  const p = /- PAUSA/g
  const t = text.replace(p, `\n${param}`)

  return t
}