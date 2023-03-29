const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  const favBlog = blogs.find(blog => blog.likes === mostLikes)
  return blogs.length === 0 ? {} : {title: favBlog.title, author: favBlog.author, likes: favBlog.likes}
}

const mostBlogs = (blogs) => {
  const authorBlogs = lodash.countBy(blogs, 'author')
  // console.log(authorBlogs)
  const mostBlogsAuthor = Object.keys(authorBlogs).reduce((a, b) => authorBlogs[a] > authorBlogs[b] ? a : b, "c")
  // console.log(mostBlogsAuthor)
  return blogs.length === 0 ? {} : {author: mostBlogsAuthor, blogs: authorBlogs[mostBlogsAuthor]}
}

const mostLikes = (blogs) => {
  const authors = lodash.uniq(blogs.map(blog => blog.author))

  authorLikes = []
  lodash.forEach(authors, (author) => {
    let sum = lodash.sumBy(blogs, (o) => { 
      return o.author === author ? o.likes : 0
    })
    authorLikes.push({ author: author, likes: sum })
  })
  const mostLikes = Math.max(...authorLikes.map(author => author.likes))
  const authorWithMostLikes = authorLikes.find(author => author.likes === mostLikes)
  
  return blogs.length === 0 ? {} : authorWithMostLikes

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}