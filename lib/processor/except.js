module.exports = (issue) => {
  const regex = /<!--\s*more\s*-->/

  if (!regex.test(issue)) {
    return ''
  }

  const splited = issue.split(regex)
  return splited[0]
}
