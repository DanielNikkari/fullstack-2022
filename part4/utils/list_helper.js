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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}