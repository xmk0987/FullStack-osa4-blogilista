/* eslint-disable */
var _ = require('lodash');

const dummy = (blogs) => {

}

const totalLikes = (blogs) => {
    const result = blogs.map(blog => blog.likes).reduce((partialSum, a) => partialSum + a,0)
    return result
}


const favoriteBlog = (blogs) => {
    const likeArray = blogs.map(blog => blog.likes)
    const mostLiked = likeArray.reduce((a, b) => Math.max(a, b), -Infinity);
    const wantedBlog =  blogs.find(blog => blog.likes === mostLiked)
    const wantedStruct = {
        title: wantedBlog.title,
        author: wantedBlog.author,
        likes: wantedBlog.likes
    }
    return wantedStruct

}


const mostBlogs = (blogs) => {
    const authorArray = blogs.map(blog => blog.author)
    const authorName = _.head(_(authorArray).countBy().entries().maxBy(_.last))
    const blogCount = authorArray.filter(v => v === authorName).length
    console.log(authorName)
    console.log(blogCount)

    const wantedStruct = {
        author: authorName,
        blogs: blogCount
    }

    return wantedStruct
}


const mostLikes = (blogs) => {
    let totalLikesBlogs = blogs;

    totalLikesBlogs = totalLikesBlogs.reduce((obj, value) => {  
    let find = obj.find(element => element.author === value.author);  
    let _d = {  
        ...value
    }
    find ? (find.likes += value.likes ) : obj.push(_d);
    return obj;
    }, [])

    const mostTotalLikes = totalLikesBlogs.map(blog => blog.likes).reduce((a, b) => Math.max(a, b), -Infinity);
    console.log(totalLikesBlogs)

    let wantedAuthorName = ""

    totalLikesBlogs.forEach(element => {
        if(element.likes === mostTotalLikes){
            console.log(element.author)
            wantedAuthorName = element.author
        }
    })

    console.log(wantedAuthorName)

    const wantedStruct = {
        author: wantedAuthorName,
        likes: mostTotalLikes
    }

    console.log(wantedStruct)


    return wantedStruct
   
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}