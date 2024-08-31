const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + (blog.likes || 0), 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, currentBlog) => (favorite === null || currentBlog.likes > favorite.likes) ? currentBlog : favorite,null)
}

const hasMostBlogs = (blogs) => {
    const authorCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1;
        return acc;
    }, {});

    const mostProlificAuthor = Object.entries(authorCount).reduce((max, [author, count]) => {
        return count > max.blogs ? { author, blogs: count } : max;
    }, { author: null, blogs: 0 });

    return mostProlificAuthor;
}

const hasMostLikes = (blogs) => {
    const likesCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {});

    const mostLikedAuthor = Object.entries(likesCount).reduce((max, [author, likes]) => {
        return likes > max.likes ? { author, likes } : max;
    }, { author: null, likes: 0 });

    return mostLikedAuthor;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    hasMostBlogs,
    hasMostLikes
}