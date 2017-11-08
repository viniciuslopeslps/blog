var db = require("../configs/db.js");
var sequelize = require("sequelize");

function createPost(body) {
    return db.post.create(body).then((post) => {
        return post;
    });
}

function findLastPosts() {
    return db.post.findAll({
        limit: 5, order: [
            ['id', 'DESC']
        ]
    })
    .then((posts) => {
        var postData = posts.map((post) => post.dataValues);
        return postData;
    });
}

function findGroupByDate(){
    return db.post.findAll({
        group: [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt'))]        
    })
    .then((posts) => {
        return posts;
    });
}

function findById(id) {
    return db.post.findById(id)
        .then((post) => {
            if (post === undefined || id === undefined) {
                reject("Invalid data");
            }
            return post;
        });
}
function findAllByDate(year, month) {
    var startDate = new Date(year, month - 1);
    var endDate = new Date(year, month - 1, 31);
    return db.post.findAll({
        where: {
            createdAt: {
                $between: [startDate, endDate]
            }
        }, order: [
            ['id', 'DESC']
        ]
    })
    .then((post) => {
        return post;
    });
};

module.exports = {
    createPost: createPost,
    findLastPosts: findLastPosts,
    findById: findById,
    findGroupByDate: findGroupByDate,
    findAllByDate: findAllByDate
};