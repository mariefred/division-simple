const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.user;

// Create and Save a new User
exports.create = async (req, res) => {
   // Validate request
   const body = req.body;

   if (!(body.email && body.password && body.name)) {
     return res.status(400).send({ error: "Data not formatted properly" });
   }

   // creating a new mongoose doc from user data
   const user = new User(body);
   // generate salt to hash password
   const salt = await bcrypt.genSalt(10);
   // now we set user password to hashed password
   user.password = await bcrypt.hash(user.password, salt);
   user.solde = 0;

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.login = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};