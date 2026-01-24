const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Guhuza ukoresheje MONGO_URI iri muri .env file
    // Twakuyemo options za useNewUrlParser na useUnifiedTopology
    await mongoose.connect(process.env.MONGO_URI, {
      // useCreateIndex: true, // Iyi yashoboraga kuba ihari ariko irashaje muri Mongoose v6+
      // useFindAndModify: false // Nayo irashaje
    });
    console.log('MongoDB Connected successfully!');
  } catch (err) {
    console.error(err.message); // Kugaragaza ikosa ryabaye
    process.exit(1); // Gufunga application mu gihe habaye ikibazo gikomeye
  }
};

module.exports = connectDB;
