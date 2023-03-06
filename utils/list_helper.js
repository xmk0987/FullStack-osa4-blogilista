/* eslint-disable */


const dummy = (blogs) => {

}

const totalLikes = (blogs) => {
    const result = blogs.map(blog => blog.likes).reduce((partialSum, a) => partialSum + a,0)
    return result
}


const favoriteBlog = (blogs) => {
    const likeArray = blogs.map(blog => blog.likes)
    console.log(likeArray)
    const mostLiked = likeArray.reduce((a, b) => Math.max(a, b), -Infinity);
    console.log(mostLiked)
    const wantedBlog =  blogs.find(blog => blog.likes === mostLiked)
    console.log(wantedBlog)
    const wantedStruct = {
        title: wantedBlog.title,
        author: wantedBlog.author,
        likes: wantedBlog.likes
    }
    console.log(wantedStruct)
    return wantedStruct

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}