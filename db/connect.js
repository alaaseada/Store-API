// const mongoose = require("mongoose");

// const connectToDB = (url) => {
//   return mongoose.connect(url);
// }

// module.exports =  connectToDB;
const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url
  //   , {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
  //   useUnifiedTopology: true,
  // }
  )
}

module.exports = connectDB