// const { MongoClient } = require("mongodb");
import { ObjectId, MongoClient } from "mongodb";
const URL =
  "mongodb+srv://sankamidhilesh:Midhi%402002@cluster0.pww5hda.mongodb.net/";

const client = new MongoClient(URL);

const dbname = "devConnect";

// async function main() {
//   await client.connect();
//   console.log("connected successfully to server");
//   const db = client.db(dbname);
//   const collection = db.collection("user_data");

//   const allUsers = await collection.find({}).toArray();

//   console.log(allUsers);

//   const data = {
//     firstname: "charan",
//     lastname: "raj",
//     place: "mumbai",
//   };

//   const insertData = await collection.insertMany([data]);
//   console.log("data is inserted", insertData);

//   const insertMultiple = await db.collection("user_data").insertMany([
//     {
//       firstname: "akshai",
//       lastname: "eligate",
//       place: "hyderabad",
//     },
//     {
//       firstname: "ravi",
//       lastname: "kiran",
//       place: "hyderabad",
//     },
//   ]);

//   console.log(insertMultiple);

//   await collection.updateOne(
//     {
//       _id: new ObjectId("6916c8f6bf436a472e2be45b"),
//     },
//     {
//       $set: {
//         firstname: "hero",
//         lastname: "first",
//       },
//     }
//   );
//   return "done";
// }

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
