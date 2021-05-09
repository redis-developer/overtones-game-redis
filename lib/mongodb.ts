import mongodb from "mongodb";

export default async () => {
  
  // Connect to MongoDb
  const mongoUrl = process.env.MONGODB_URI

  try {
    const client = await mongodb.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return client.db();
  } catch (err) {
    console.log(
      "❗️MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  }
};
