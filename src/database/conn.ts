import mongoose from 'mongoose';

async function main() {

  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect("mongodb+srv://adm:nostradamus@clusterone.65tt0uq.mongodb.net/")
    console.log("Connected")
  } catch (error) {
    console.log(`erro: ${error}`);
  }

}

export default main;
