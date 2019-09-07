var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
 // password : 'ApoD_rasStRELny',
    password : 'password',
  database : 'Lophophore'
 });

con.connect(function(err) {



app.use(express.static(__dirname + "/views"));

    app.set("view engine", "ejs");
    
  //  app.set("view engine", "hbs");
    
/*app.post("/register", function (req, res) { 
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
     age = req.body.userAge;
     seks = req.body.Seks;
    //res.sendfile('index.html');
});
*/
    
app.get('/', function(req, res) {
    res.sendfile('views/index.html');
});

app.get('/add', function(req, res) {
  res.sendfile('views/add.html');
});

app.get('/hand', function(req, res) {
  res.sendfile('views/hand.html');
});

app.use('/', bodyParser.urlencoded({
    extended: true
}));

      
app.post('/adder', function(req, res, next)
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
        res.sendfile('views/add.html');
  });   
      
app.post('/handler', function(req, res, next) {
 
  if (err) throw err;

    con.query("SELECT COUNT(*) AS count FROM ClothesNames, TagAge, TagGender WHERE ClothesNames.id = TagAge.cid AND ClothesNames.id = TagGender.cid AND age = ? AND gender = ?", [req.body.Age, req.body.Gender], function (err, rows, fields) {
    if (err) throw err;
    count = rows[0].count;

            if (count == 0) {
       res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(
            '<!DOCTYPE html>'
+'<html>'
 +'<head>'
  +'<meta charset="utf-8">'
  +'<title> Sorry, Lophophore</title>'
   +'<link rel = "stylesheet" href="styles.css"/>'
+'<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">'
 +    '<link href="https://fonts.googleapis.com/css?family=Fira+Sans:300" rel="stylesheet">'
  +   '<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">'
   +  '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet">'
    + '<link href="https://fonts.googleapis.com/css?family=Ubuntu+Condensed" rel="stylesheet">'
+    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">'
 +   ' <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>'
 +    '<script>$(document).ready(function(){   '
  + ' $(window).scroll(function () {'
    +   ' if ($(this).scrollTop() > 130) {'
   +       '  $("#scroller").fadeIn();'
    +    '} else {'
    +       ' $("#scroller").fadeOut();'
    + '   }'
+    '});'
+'});</script>'
 +   ' <script src="http://code.jquery.com/jquery-latest.js"></script>'
 +'</head>'
 +'<body>'
+   '<header>'
+  '<h1 font-size="20px">Lophophore</h1>'
+         '</header>'
+       '<nav>'
+        '<ul>'
+ '<li><a href="">Новости</a></li><li style="float:center"><a href="hand.html">Подобрать</a></li><li><a href="">Тренды</a></li>'
+         '</ul>'
+          '    <hr class="head">'
+      '</nav>'
+  ' <table align="center" cellpadding="0">'
  +'<h1>Мы не смогли подобрать ни одной вещи!</h1>'
                 +'<li class = second><a class ="EntBtn" href="/hand">Повторить выбор</a></li>'
              +'</table>'
+        '</body>'
+        '</html>'
          )

        res.end();  
    }
            con.query("SELECT name, clothPoints, src, imgsrc, age, style, event, gender FROM ClothesNames, TagAge, TagEvent, TagGender, TagStyle WHERE ClothesNames.id = TagAge.cid AND ClothesNames.id = TagEvent.cid AND ClothesNames.id = TagGender.cid AND ClothesNames.id = TagStyle.cid AND age = ? AND gender = ? ", [req.body.Age, req.body.Gender], function (err, result, fields) {
    if (err) throw err;

      var JsonParce = JSON.parse(JSON.stringify(result));
         cardName = [];
         cardImage = [];
         cardId = [];
          //var clothPoints = [];
          for (var i = 0; i < count; i++) {              
              console.log(JsonParce[i].name + " Имя и очкo " + JsonParce[i].clothPoints);
          if (JsonParce[i].event == req.body.Event){
              JsonParce[i].clothPoints += 5;
          }
          
           if (JsonParce[i].style == req.body.Style){
               JsonParce[i].clothPoints += 1;
          }

    for (var i = 0; i < count-1; i++)
     { for (var j = 0; j < count-1-i; j++)
        { if (JsonParce[j+1].clothPoints < JsonParce[j].clothPoints)
           { var t = JsonParce[j+1]; JsonParce[j+1] = JsonParce[j]; JsonParce[j] = t; }
        }
     }      var gender;
              if(req.body.Gender == 1){
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

console.log('Сервер стартовалs!');
app.listen(8080);