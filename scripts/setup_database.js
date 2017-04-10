var User = require('../api/users/model');
var Post = require('../api/posts/model');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trello');

var u = new User();
u.email = 'test@example.org';
u.name = 'Me';

var u2 = new User();
u2.email = 'test2@example.org';
u2.name = 'Rose';

User.remove({})
.then(function() {
  return Post.remove({})
})
.then(function() {
  return Promise.all([u.save(), u2.save()]);
})
.then(function() {
  var p = new Post();
  p.title = "Cute Little Cactus!";
  p.description = "Don't have a pot small enough for it!";
  p.location = 'Toronto';
  p.user = u._id;
  p.comments.push({ user: u2, content: 'I want this!'});
  p.likedBy.push(u2);

  var p2 = new Post();
  p2.title = "HBC Knit Throw";
  p2.description = "Never used because my dog interprets all commands ('sit, stay, be good' etc) as 'please put your butt on nice stuff'";
  p2.location = 'Oakville';
  p2.user = u2._id;
  p2.comments.push({ user: u, content: 'This looks great!'});
  p2.likedBy.push(u2);

  var p3 = new Post();
  p3.title = "HBC Knit Throw";
  p3.location = 'Toronto';
  p3.description = "Never used because my dog interprets all commands ('sit, stay, be good' etc) as 'please put your butt on nice stuff'";
  p3.user = u._id;
  p3.likedBy.push(u2);

  return Promise.all([p.save(), p2.save(), p3.save()])
})
.then(function(p, p2, p3) {
  console.log("All posts saved! Ctrl-C to exit.")
})
.catch(console.log)
