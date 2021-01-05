const router = require('express').Router();
// Requiring our models and passport as we've configured it
const db = require('../../models');
const passport = require('../../config/passport');
const isAuthenticated = require('../../config/middleware/isAuthenticated');
// const supplier = require('../../models/supplier');
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the account page.
// Otherwise the user will be sent an error
router
  .route('/login', isAuthenticated)
  .post(passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.redirect('/account');
  });

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.route('/signup', isAuthenticated).post((req, res) => {
  console.log('this is the sign up object', req.body.email);
  db.user
    .create(req.body)
    .then(() => {
      res.status(200).json({
        msg: 'You are successfully Registered!'
      });
    })
    .catch((err) => {
      res.status(401).json(err.message);
    });
});

// Route for getting some data about our user to be used client side
router.route('/user_data', isAuthenticated).get((req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    return res.json({});
  }
  // Otherwise send back the user's email and id
  // Sending back a password, even a hashed password, isn't a good idea
  const { password, ...user } = req.user;
  res.json(user);
});
// matt added this API Route

router.route('/account', isAuthenticated).get((req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    return res.json({});
  }
  const user = req.user.email;
  db.order
    .findAll({
      include: [
        {
          model: db.supplier_map_login,
          where: { login_email: user }
        },
        { model: db.supplier }
      ]
    })
    .then((results) => {
      res.json({ results });
    })
    .catch((err) => {
      console.log(err);
    });
});
// route for updating a record
router.route('/account/:id', isAuthenticated).put((req, res) => {
  db.order
    .update(req.body, { where: { id: req.params.id } })
    .then((updated) => {
      res.json(updated);
    });
});
// route for adding a record
router.route('/orders', isAuthenticated).post((req, res) => {
  console.log(req.body);
  db.order
    .create({
      item: req.body.item,
      po_received: req.body.poReceived,
      po_due_date: req.body.dueDate,
      supplier_number: req.body.supplier,
      po_number: req.body.poNum,
      // supplier_id: req.body.supplierId,
      supplier_map_login_id: '1'
      // supplier_map_login_id: req.body.supplierMapId
    })
    .then((updated) => {
      res.json(updated);
    });
});

// route for admin access

router.route('/admin', isAuthenticated).get((req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    return res.json({});
  }
  db.supplier_map_login
    .findAll({})
    .then((results) => {
      res.json({ results });
      console.log({ results });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
