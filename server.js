var express = require('express');

var app = express();
var PORT = process.env.PORT || 8080;

var db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('login'));
app.use(express.static('public'));


require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});

