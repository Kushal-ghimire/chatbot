const mongoose = require("mongoose");

mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB connected with HOST: ${con.connection.host}`);
    });
