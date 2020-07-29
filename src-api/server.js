//======IMPORTACIONES======//
const FamilyRouter = require('./routes/family.routes');
const IngredientRouter = require('./routes/ingredients.routes');

const express = require("express");
var cors = require('cors');
const exphbs = require("express-handlebars");
const path = require("path"); 
const methodOverride = require("method-override"); //
const session = require("express-session"); //
const flash = require("connect-flash");
const passport = require("passport");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const UserRouter = require("./routes/user.routes");
const CartRouter = require("./routes/cart.routes");
const ProductRouter = require("./routes/product.routes");
const DocumentRouter = require("./routes/document.routes");

//======INICIALIZADORES======//
const app = express();
require("./config/passport");

app.set("port", process.env.PORT || 3003);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan("dev"));
app.use(express.json());
// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use(cors());

//=======ROUTES======//

//USER
app.use("/api/users", UserRouter );
app.use("/api/user", UserRouter );


//CART
app.use("/carts", CartRouter); 
app.use("/cart", CartRouter); 

//======FAMILY======//
app.use('/families', FamilyRouter);
app.use('/family', FamilyRouter);

  //ingredients routes
app.use('/ingredients', IngredientRouter);
app.use('/ingredient', IngredientRouter);

//DOCUMENTS
app.use("/api/documents", DocumentRouter);
app.use("/api/document", DocumentRouter);


//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
