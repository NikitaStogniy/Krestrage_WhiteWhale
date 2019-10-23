var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').config()
var exphbs = require('express-handlebars')
var mysql = require('mysql')


//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Твои глаза - это ключ к моим секретам
app.use(session({
    secret: "Alexa",
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require("./app/models");

//Routes

var authRoute = require('./app/routes/auth.js')(app, passport);


//load passport strategies

require('./app/config/passport/passport')(passport, models.user);


//Sync Database

models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')


}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
 // password : 'ApoD_rasStRELny',
    password : 'password',
  database : 'Lophophore'
 });

con.connect(function(err) {


app.use(express.static(__dirname + "/assets"));

app.use(express.static(__dirname + "/views"));

app.use(express.json());

app.set("view engine", "ejs");

app.get('/admin', function(req, res) {
    res.render("admin", {user: res.locals.user,});
});

app.post('/add', function(req, res, next)
{
    if (err) throw err;
    con.query("SELECT COUNT(*) AS count FROM ClothesNames", function (err, rows, fields) {
    if (err) throw err;
    count = rows[0].count;
    count = count + 1;

    var ClothesNamesMass = {
        name: req.body.name,
        src: req.body.src,
        imgsrc: req.body.imgsrc
    }

    var TagAgeMass = {
        age: req.body.Age,
        cid: count
    }
           
    var TagEventMass = {
        event: req.body.Event,
        cid: count
    }
    
    var TagGenderMass = {
        gender: req.body.Gender,
        cid: count
    }
    var TagStyleMass = {
        style: req.body.Style,
        cid: count
    }
                
        con.query("INSERT INTO ClothesNames SET ?", ClothesNamesMass, function (err, rows, fields) {
              if (err) throw err;
            con.query("INSERT INTO TagAge SET ?", TagAgeMass, function (err, rows, fields) {
                  if (err) throw err;
             con.query("INSERT INTO TagEvent SET ?", TagEventMass, function (err, rows, fields) {
                   if (err) throw err;
            con.query("INSERT INTO TagGender SET ?", TagGenderMass, function (err, rows, fields) {
                  if (err) throw err;
            con.query("INSERT INTO TagStyle SET ?", TagStyleMass, function (err, rows, fields) {
             if (err) throw err;
        });
        });
        });
        });
        });
        });
    //con.query("INSERT INTO ClothesNames TagAge (age), TagEvent (event), TagGender (gender), TagStyle (style) SET ClothesNames.name = ? AND ClothesNames.src = ? AND ClothesNames.imgsrc = ? AND TagAge.age = ? AND TagGender.gender = ? AND TagStyle.style = ? AND TagEvent.event = ?", [req.body.name, req.body.src, req.body.imgsrc, req.body.Age, req.body.Gender, req.body.style, req.body.event] , function (err, rows, fields) {
   // if (err) throw err;
   
   // });
        res.redirect('/add');
  });   
      
app.post('/handler', function(req, res, next) {
 
  if (err) throw err;

    con.query("SELECT COUNT(*) AS count FROM ClothesNames, TagAge, TagGender WHERE ClothesNames.id = TagAge.cid AND ClothesNames.id = TagGender.cid AND age = ? AND gender = ?", [req.body.rangeInput_age, req.body.radio_button_gender], function (err, rows, fields) {
    if (err) throw err;
    count = rows[0].count;
        console.log('Count: ' + count);
            if (count == 0) {

                res.render("query_result_none", {});

    }
            con.query("SELECT name, clothPoints, src, imgsrc, age, style, event, gender FROM ClothesNames, TagAge, TagEvent, TagGender, TagStyle WHERE ClothesNames.id = TagAge.cid AND ClothesNames.id = TagEvent.cid AND ClothesNames.id = TagGender.cid AND ClothesNames.id = TagStyle.cid AND age = ? AND gender = ? ", [req.body.rangeInput_age, req.body.radio_button_gender], function (err, result, fields) {
    if (err) throw err;

      var JsonParce = JSON.parse(JSON.stringify(result));
         cardName = [];
         cardImage = [];
         cardId = [];
          //var clothPoints = [];
          for (var i = 0; i < count; i++) {              
              console.log(JsonParce[i].name + " Имя и очкo " + JsonParce[i].clothPoints);
          if (JsonParce[i].event == req.body.radio_button_event){
              JsonParce[i].clothPoints += 5;
          }
          
           if (JsonParce[i].style == req.body.radio_button_style){
               JsonParce[i].clothPoints += 1;
          }

    for (var i = 0; i < count-1; i++)
     { for (var j = 0; j < count-1-i; j++)
        { if (JsonParce[j+1].clothPoints < JsonParce[j].clothPoints)
           { var t = JsonParce[j+1]; JsonParce[j+1] = JsonParce[j]; JsonParce[j] = t; }
        }
     }      var gender;
              if(req.body.radio_button_gender == 1){
                  gender = "М";
              }
              else {
                  gender = "Ж";
              }
            for (var c = 0; c < count; c ++){
                if(c < (count - 6)){
                    card = card;
                }
                else{
                if(c == 4 || c == 7){
                    cardId.push(JsonParce[c].src);
                    cardImage.push(JsonParce[c].imgsrc);
                    cardName.push(JsonParce[c].name);
                    console.log("xyi");
                }
                else{
                    cardId.push(JsonParce[c].src);
                    cardImage.push(JsonParce[c].imgsrc);
                    cardName.push(JsonParce[c].name);
                    }
          }
                }



              res.render("query_result", {
                  cardId,
              cardImage,
              cardName

              });
        res.end();
          }
});  
});
});
});

console.log('Сервер стартовал!');
app.listen(80);