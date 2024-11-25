// Importa o framework Express para criar a aplicação web.
// Importa o módulo dotenv para carregar as variáveis de ambiente a partir do arquivo .env.
// Importa o módulo de rotas `postRoutes.js` que define as rotas da aplicação.
import express from "express";
import 'dotenv/config';
import routes from "./src/routes/postRoutes.js";

// Cria uma instância do servidor Express.
const app = express();

// Configura as rotas da aplicação.
app.use(express.static("uploads"));

// Chama a função `routes` do arquivo postRoutes.js para configurar as rotas da aplicação.
routes(app);

// Define a porta do servidor, usando a variável de ambiente `PORT` se estiver definida, caso contrário, usa a porta 5000 como padrão.
const PORT = process.env.PORT || 5000;

// Habilita o middleware `express.json()` para analisar o corpo das requisições JSON.
app.use(express.json());

// Inicia o servidor na porta 3000.
app.listen(3000, () => {
  try {
    // Imprime uma mensagem no console indicando que o servidor foi iniciado com sucesso.
    console.log(`Servidor iniciado na porta ${PORT}`);
  } catch (error) {
    // Imprime qualquer erro que ocorra durante o processo de inicialização do servidor.
    console.error(error);
  }
});
