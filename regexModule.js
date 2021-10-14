function commentParsing(item, index, array) {
  const commentRegex = /(.{1,20})/
  const commentResult = commentRegex.exec(item.comment)[1]
  return array[index]['brief_comment'] = `${commentResult}......`
}

function timeParsing(item, index, array) {
  const timeRegex = /(\w{1,5}\s\w{1,5}\s\d{2}\s\d{4}\s\d{2}\:\d{2}\:\d{2})/
  const timeResult = timeRegex.exec(item.created_at)[1]
  return array[index]['brief_updated_at'] = timeResult
}

function regexController(array) {
  array.forEach((item, index) => {
    commentParsing(item, index, array)
    timeParsing(item, index, array)
  })
  return array
}

module.exports = regexController