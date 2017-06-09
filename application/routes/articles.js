var express = require('express');
var router = express.Router();
var Article = require('../models/ArticleSchema');

/* GET articles listing. */
router.get('/', function(req, res, next) {
	Article.find(function(err, articles) {
					 if (err)
							 res.send(err);

					 res.json(articles);
			 });
});

router.post('/', (req, res) => {

		var article = new Article();

		article.title = req.body.title;
		article.body = req.body.articleBody;

		console.log(req.body.title);
		article.save(function(err) {
			if(err)
				res.send(err);

			res.json({ message : "Article Created"});
		});

});

module.exports = router;
