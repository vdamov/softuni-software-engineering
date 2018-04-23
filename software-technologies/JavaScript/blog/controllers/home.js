const Article = require('../models').Article;
const User = require('../models').User;
const Comment = require('../models').Comment;

module.exports = {
    index: (req, res) => {
        Article.findAll({
            limit: 3, include: [{

                model: User

            }]
        }).then(articles => {
            res.render('home/index', {articles: articles});
        });
    }
};





