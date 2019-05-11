module.exports = (issue) => {
  const regex = /<!--\s*more\s*-->/
  const splited = issue.split(regex)

  return splited[0] || ''
}
