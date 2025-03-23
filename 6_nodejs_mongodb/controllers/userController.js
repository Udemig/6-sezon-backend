//get-all
exports.getAllUsers = (req, res) => {
  res.status(200).json("getallusers çalıştı");
};

//post
exports.createUsers = (req, res) => {
  res.status(200).json("createusers çalıştı");
};

//get-id
exports.getUsers = (req, res) => {
  res.status(200).json("getusers çalıştı");
};

//put-patch-id
exports.updateUsers = (req, res) => {
  res.status(200).json("updateusers çalıştı");
};

//delete-id
exports.deleteUsers = (req, res) => {
  res.status(200).json("deleteusers çalıştı");
};
