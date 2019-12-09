var cors = require('cors');
const bodyParser = require('body-parser');

module.exports = (app, User) => {
  /* parsing */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  
  app.post('/api/list', cors(), (req, res) => {
    if(req.body.id===undefined){
      console.log(req.body)
      console.log("id is undefined")
      return;
    }
    /* 모든 name 정보 get */
    User.findOne({id: req.body.id}, (err, user) => {
      if (err) return;
      else if (user === null) {
        console.log("null list");
        return [];
      }
      else {
        console.log("name list");
        return res.json(user.name);
      }
    });
  });

  app.post('/api/add', (req, res) => {
    if(req.body.id===undefined){
      console.log("id is undefined")
      console.log(req.body)
      return;
    }
    if (req.body.id.length < 2 || req.body.id.length > 4 || 
      req.body.name[0].length < 2 || req.body.name[0].length > 4) {
      console.log('Wrong input');
      return;
    }
    User.findOne({id: req.body.id}, (err, user) => {
      if (err) return;
      else if (user === null) {
        let newuser = new User();
        newuser.id = req.body.id;
        newuser.name = req.body.name;
        newuser.save(err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('good data created');
          return;
        });
      }
      else {
        user.name = user.name.concat(req.body.name);
        user.save(err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('database successfully updated');
          return;
        });
      }
    });
  });

  app.post('/api/delete', (req, res) => {
    if(req.body.id===undefined){
      console.log("id is undefined")
      return;
    }
    if (req.body.id.length < 2 || req.body.id.length > 4 || 
      req.body.name[0].length < 2 || req.body.name[0].length > 4) {
      console.log('Wrong input');
      return;
    }
    User.findOne({id: req.body.id}, (err, user) => {
      if (err) return;
      else if (user === null) {
        return;
      }
      else {
        user.name.splice(user.name.indexOf(req.body.name[0]),1);
        user.save(err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('deleted');
          return;
        });
      }
    });
  });
}