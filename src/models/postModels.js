// Importa a função `connectDB` do módulo `dbConfig.js`, que provavelmente contém a lógica para conectar ao banco de dados MongoDB.
import { ObjectId } from "mongodb";
import "dotenv/config";
import connectDB from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a URI fornecida pela variável de ambiente `MONGODB_URI`.
const connect = await connectDB(process.env.MONGODB_URI);

export async function getAllPosts() {
  try {
    // Seleciona o banco de dados "Instabytes".
    const db = connect.db("Instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados.
    const postsCollection = db.collection("posts");
    // Busca todos os documentos da coleção "posts" e os converte em um array.
    const posts = postsCollection.find().toArray();
    // Retorna o array de posts.
    return posts;
  } catch (error) {
    // Imprime uma mensagem de erro no console, incluindo a mensagem de erro original.
    console.error({ message: "erro de requisição dos posts" }, error);
    // Re-lanca o erro para que seja tratado por um nível superior de código.
    throw error;
  }
}

// Implementar a criação de um novo post
export async function createNewPost(newPost) {
  try {
    // Seleciona o banco de dados "Instabytes".
    const db = connect.db("Instabytes");
    // Seleciona a coleção "posts" dentro do banco de dados.
    const postsCollection = db.collection("posts");
    // Insere um novo documento (post) na coleção "posts".
    const result = await postsCollection.insertOne(newPost);
    // Retorna o resultado da operação de inserção.
    return result;
  } catch (error) {
    // Imprime uma mensagem de erro no console, incluindo a mensagem de erro original.
    console.error({ message: "Erro na criação do post" }, error);
    // Re-lanca o erro para que seja tratado por um nível superior de código.
    throw error;
  }
}

export async function updateNewImage(id, updatePost) {
  const db = connect.db("Instabytes");
  const postsCollection = db.collection("posts");
  const objectId = ObjectId.createFromHexString(id);
  return postsCollection.updateOne(
    { _id: new ObjectId(objectId) },
    { $set: updatePost }
  );
}
