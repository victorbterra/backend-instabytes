import { MongoClient } from "mongodb";

export default async function connectDB(connectString) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(connectString);
    console.log("Conectando ao cluster do banco de dados...");
    await mongoClient.connect();
    console.log("Conexão com o MongoDB realizada com sucesso!");
    return mongoClient
  } catch (error) {
    console.error("Falha na conexão com o banco de dados !", error);
    process.exit();
  }
}
