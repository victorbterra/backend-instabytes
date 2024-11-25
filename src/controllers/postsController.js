// Importa as funções `getAllPosts` e `createNewPost` do módulo `postModels.js`, que provavelmente contém a lógica para interagir com o banco de dados.
// Importa o módulo `fs` do Node.js, que é usado para operações de sistema de arquivos, como renomear arquivos.
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";
import {
  getAllPosts,
  createNewPost,
  updateNewImage,
} from "../models/postModels.js";

export async function listPosts(req, res) {
  // Obtém todos os posts do banco de dados usando a função `getAllPosts`.
  const posts = await getAllPosts();
  // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
  res.status(200).json(posts);
}

export async function createPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição.
  const newPost = req.body;
  try {
    // Tenta criar um novo post no banco de dados usando a função `createNewPost`.
    const createdPost = await createNewPost(newPost);
    // Se a criação for bem-sucedida, envia uma resposta HTTP com status 201 (Criado) e o post criado no formato JSON.
    res.status(201).json(createdPost);
  } catch (error) {
    // Se ocorrer um erro durante a criação do post, imprime a mensagem de erro no console.
    console.error(error.message);
    // Envia uma resposta HTTP com status 500 (Erro interno do servidor) e uma mensagem de erro.
    res.status(500).json({ erro: "Erro interno do servidor." }, error);
  }
}

export async function uploadImage(req, res) {
  // Cria um objeto `newPost` com os dados do novo post, incluindo o nome original do arquivo de imagem.
  const newPost = {
    description: "",
    imageurl: req.file.originalname,
    alt: "",
  };
  try {
    // Tenta criar um novo post no banco de dados.
    const createdPost = await createNewPost(newPost);
    // Constrói o novo nome do arquivo de imagem, usando o ID do post criado.
    const imgupdated = `uploads/${createdPost.insertedId}.png`;
    // Renomeia o arquivo de imagem para o novo nome.
    fs.renameSync(req.file.path, imgupdated);
    // Se tudo ocorrer bem, envia uma resposta HTTP com status 201 e o post criado.
    res.status(201).json(createdPost);
  } catch (error) {
    // Se ocorrer um erro, imprime a mensagem de erro no console.
    console.error(error.message);
    // Envia uma resposta HTTP com status 500 e uma mensagem de erro.
    res.status(500).json({ erro: "Falha na requisição." }, error);
  }
}

export async function upadteNewPost(req, res) {
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`;
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await gerarDescricaoComGemini(imageBuffer);
    const Post = {
      title: req.body.title,
      content: description,
      author: req.body.author,
      imageurl: urlImage,
      alt: req.body.alt
    };
    // Tenta atualizar o post no banco de dados usando a função `updateNewImage`.
    const updatedPost = await updateNewImage(id,Post);
    // Se a atualização for bem-sucedida, envia uma resposta HTTP com status 200 e o post atualizado no formato JSON.
    res.status(200).json(updatedPost);
  } catch (error) {
    // Se ocorrer um erro durante a atualização do post, imprime a mensagem de erro no console.
    console.error(error.message);
    // Envia uma resposta HTTP com status 500 e uma mensagem de erro.
    res.status(500).json({ erro: "Falha na requisição." }, error);
  }
}
