const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/coderest")
    .then(() => console.log("Conectado a MongoDB Madrefokaaaa"))
    .catch(error => console.log(error))
