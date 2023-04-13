const listHelper = require('../utils/listhelper')

describe('basic tests', () => {
  test('empty returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  test('length test 1 blog', () => {
    const blogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
    ]
    const result = listHelper.totalBlogs(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const list1blog5likes = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
  ]
  test('one blog with 5 likes', () => {
    const result = listHelper.totalLikes(list1blog5likes)
    expect(result).toBe(5)
  })

  const list1blog0likes = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
    },
  ]
  test('one blog with zero likes', () => {
    const result = listHelper.totalLikes(list1blog0likes)
    expect(result).toBe(0)
  })

  const list1blog10Mlikes = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10000000,
    },
  ]
  test('one blog with 10 000 000 likes', () => {
    const result = listHelper.totalLikes(list1blog10Mlikes)
    expect(result).toBe(10000000)
  })

  const list6blog36like = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
  ]

  test('6 blogs with 36 likes', () => {
    const result = listHelper.totalLikes(list6blog36like)
    expect(result).toBe(36)
  })
})

describe('favorit block', () => {
  const listEmpty = []
  test('empty', () => {
    const result = listHelper.favoriteBlog(listEmpty)
    expect(result).toEqual({})
  })

  test('empty2', () => {
    const result = listHelper.favoriteBlog(listEmpty)
    expect(result).toEqual({})
  })

  const list1blog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
  ]
  var favBlog1 = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  }

  test('favorite of 1 blog', () => {
    const result = listHelper.favoriteBlog(list1blog)
    expect(result).toEqual(favBlog1)
  })

  const list3blog = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
  ]

  var favBlog2 = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  }

  test('favorite of 3 blogs', () => {
    const result = listHelper.favoriteBlog(list3blog)
    expect(result).toEqual(favBlog2)
  })
})

describe('most blogs', () => {
  const list5blogs2authors = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
  ]
  var maxBlogs = {
    author: 'Jore',
    count: 3,
  }
  test('five blogs, 2 authors', () => {
    const result = listHelper.mostBlogs(list5blogs2authors)
    expect(result).toEqual(maxBlogs)
  })

  const emptyList = []
  var maxBlogs0 = {}

  test('1 blog', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual(maxBlogs0)
  })

  const list1blog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
  ]
  var maxBlogs1 = {
    author: 'Jore',
    count: 1,
  }

  test('0 blogs', () => {
    const result = listHelper.mostBlogs(list1blog)
    expect(result).toEqual(maxBlogs1)
  })
})

describe('most likes', () => {
  const list5blogs2authors = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
  ]
  var maxLikes = {
    author: 'Jore',
    likes: 18,
  }
  test('five blogs, 2 authors', () => {
    const result = listHelper.mostLikes(list5blogs2authors)
    expect(result).toEqual(maxLikes)
  })

  const emptyList = []
  var maxLikes0 = {}

  test('1 blog', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual(maxLikes0)
  })

  const list1blog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Jore',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    },
  ]
  var maxLikes1 = {
    author: 'Jore',
    likes: 6,
  }

  test('0 blogs', () => {
    const result = listHelper.mostLikes(list1blog)
    expect(result).toEqual(maxLikes1)
  })
})
