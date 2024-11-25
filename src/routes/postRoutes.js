// Importa o framework Express para criar a API.
// Importa o módulo `multer` para lidar com uploads de arquivos.
// Importa as funções controladoras `listPosts`, `createPost` e `uploadImage` do módulo `postsController.js`, que provavelmente contêm a lógica de negócio da API.
import express from "express";
import multer from "multer";
import cors from "cors";
import {
  listPosts,
  createPost,
  uploadImage,
  upadteNewPost,
} from "../controllers/postsController.js";

const corsOptions =  {
  // Adiciona o middleware `cors` para permitir acessos de outras origens.
  // Neste caso, permite todos os origens.
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  // Define o destino para o armazenamento dos arquivos como a pasta 'uploads/'.
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Mantém o nome original do arquivo durante o upload.
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Configura o middleware `multer` utilizando a estratégia de armazenamento `storage`.
const upload = multer({ dest: "./uploads", storage });
const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions))
  // rota para listar posts
  app.get("/posts", listPosts);
  // rota para criar um novo post
  app.post("/createpost", createPost);
  // rota para posts de imagens
  app.post("/upload", upload.single("image"), uploadImage);
  // rota para atualizar post
  app.put("/upload/:id", upadteNewPost);
};

export default routes;
