const dummy = () => {
  return 1
}

const totalBlogs = (blogs) => {
  return blogs.length
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  var maxLikes = 0
  var favBlog = {}
  for (var i = 0; i < blogs.length; i++) {
    if (blogs[i].likes >= maxLikes) {
      maxLikes = blogs[i].likes
      favBlog.title = blogs[i].title
      favBlog.author = blogs[i].author
      favBlog.likes = blogs[i].likes
    }
  }
  return favBlog
}

const mostBlogs = (blogs) => {
  var maxBlogsAuthor = {}
  var maxList = []

  for (var i = 0; i < blogs.length; i++) {
    // ei vielä listassa, lisää
    var found = maxList.filter((item) => item.author === blogs[i].author)
    if (found.length === 0) {
      const newAuthorItem = {}
      newAuthorItem.author = blogs[i].author
      newAuthorItem.count = 1
      maxList.push(newAuthorItem)
    } else {
      // on jo listassa, inkrementoi määrää
      maxList.forEach((maxListItem) => {
        if (maxListItem.author === blogs[i].author) {
          maxListItem.count += 1
        }
      })
    }
  }

  var maxCount = 0
  /* etsi isoin */
  for (var j = 0; j < maxList.length; j++) {
    if (maxList[j].count >= maxCount) {
      maxCount = maxList[j].count
      maxBlogsAuthor.count = maxList[j].count
      maxBlogsAuthor.author = maxList[j].author
    }
  }
  //console.log('...maxBlogsAuthor...', maxBlogsAuthor)

  return maxBlogsAuthor
}

const mostLikes = (blogs) => {
  var maxLikesAuthor = {}
  var maxList = []

  for (var i = 0; i < blogs.length; i++) {
    // ei vielä listassa, lisää
    var found = maxList.filter((item) => item.author === blogs[i].author)
    if (found.length === 0) {
      const newAuthorItem = {}
      newAuthorItem.author = blogs[i].author
      newAuthorItem.likes = blogs[i].likes
      //      newAuthorItem.count = 1
      maxList.push(newAuthorItem)
    } else {
      // on jo listassa, inkrementoi määrää
      maxList.forEach((maxListItem) => {
        if (maxListItem.author === blogs[i].author) {
          //          maxListItem.count += 1
          maxListItem.likes += blogs[i].likes
        }
      })
    }
  }

  var maxLikes = 0
  /* etsi isoin */
  for (var j = 0; j < maxList.length; j++) {
    if (maxList[j].likes >= maxLikes) {
      maxLikes = maxList[j].likes
      maxLikesAuthor.likes = maxList[j].likes
      maxLikesAuthor.author = maxList[j].author
    }
  }
  //  console.log('...maxLikesAuthor...', maxLikesAuthor)
  return maxLikesAuthor
}

module.exports = {
  dummy,
  totalBlogs,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
