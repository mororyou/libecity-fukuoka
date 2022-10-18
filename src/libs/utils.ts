export const groupBy = function (xs: any, key: any) {
  return xs.reduce(function (rv: any, x: any) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
