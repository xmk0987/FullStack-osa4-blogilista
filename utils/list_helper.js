/* eslint-disable */
/*
const dummy = (blogs) => {

}*/

const totalLikes = (blogs) => {
    const result = blogs.map(blog => blog.likes).reduce((partialSum, a) => partialSum + a,0)
    return result
}

module.exports = {
  //dummy,
  totalLikes
}