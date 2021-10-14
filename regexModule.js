function commentParsing(comments, comment, index) {
  const commentRegex = /(.{1,20})/
  const commentResult = commentRegex.exec(comment.comment)[1]
  return comments[index]['brief_comment'] = `${commentResult}......`
}

function timeParsing(comments, comment, index) {
  const timeRegex = /(\w{1,5}\s\w{1,5}\s\d{2}\s\d{4}\s\d{2}\:\d{2}\:\d{2})/
  const timeResult = timeRegex.exec(comment.created_at)[1]
  return comments[index]['brief_updated_at'] = timeResult
}

function parsingController(comments) {
  comments.forEach((comment, index, array) => {
    commentParsing(array, comment, index)
    timeParsing(array, comment, index)
  })
  return comments
}

module.exports = parsingController