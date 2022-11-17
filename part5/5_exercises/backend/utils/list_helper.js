const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((a,b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
    const fav = blogs.sort((a,b) => b.likes - a.likes)
    return fav[0]
}

const mostBlogs = (blogs) => {
    let count = {}
    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].author in count){
            count[blogs[i].author] += 1
        } else {
            count[blogs[i].author] = 0
        }
    }
    const blogger = Object.keys(count).reduce((a,b) => count[a] > count[b] ? a: b)
    let biggest = blogs.find(({author}) => author === blogger)
    return {
        author: biggest.author,
        blogs: count[biggest.author] + 1
    }
}

const mostLikes = (blogs) => {
    let count = {}
    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].author in count){
            count[blogs[i].author] += blogs[i].likes
        } else {
            count[blogs[i].author] = blogs[i].likes
        }
    }
    const blogger = Object.keys(count).reduce((a,b) => count[a] > count[b] ? a: b)
    let biggest = blogs.find(({author}) => author === blogger)
    return {
        author: biggest.author,
        blogs: count[biggest.author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
