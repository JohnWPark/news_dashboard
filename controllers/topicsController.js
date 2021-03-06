//requires our model definitions
var UserModel = require("../models/user");
var TopicModel = require("../models/topic");
// var ArticleModel = require("../models/article");

// instantiates an usersController which will contain all of our controller actions
var topicsController = {
  // the index action will make a DB query to find all user documents in our
  // users collection, when it does it will render the users/index view and
  // pass the user objects to the template
  index: function(req, res){
    UserModel.find({}, function(err, docs){
      res.render("topics/index", {users: docs});
    });
  },

  new: function(req, res) {
    res.render("topics/new");
  },

  create: function(req, res) {
    //NEED TO FIND OUT IF WE CAN ACCESS CURRENTUSER HERE
    //perhaps currentUser.topics.push(topic?)
    // var topic = new TopicModel({keyword: req.body.keyword});
    // topic.save(function(err){
    //   if(!err) {
    //     console.log(err);
    //     res.redirect("topics");
    //   }
    // });
    var currentUser = req.user;
    currentUser.topics.push(new TopicModel({keyword: req.body.keyword}));
    currentUser.save(function(err){
      if(!err) {
        res.redirect('topics');
      }
    });
  }
};

// exports the controller so we can use the file as the controller.
// re: index.js: var usersController = require("./controllers/usersController")
module.exports = topicsController;
