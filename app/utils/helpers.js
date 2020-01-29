// taken from https://gist.github.com/jed/982883#gistcomment-3142904
const uuid = (c = 9999) => {
  const t = ((Date.now() + 12219292800000) * 1E4).toString(16)
  const n = crypto.getRandomValues(new Uint8Array(6)).reduce((sum, x, i) => {
    return sum + ((i === 0) ? x|1 : x).toString(16).padStart(2, '0')
  }, '')

  return `${t.slice(-8)}-${t.slice(-12, -8)}-1${t.slice(0, 3)}-${c}-${n}`
}

export { uuid }
