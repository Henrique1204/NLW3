// Importa a biblioteca express.
import express from "express";
// Importando biblioteca para tratamento de excessões.
import "express-async-errors";
// Importando biblioteca que lida com o cors da API.
import cors from "cors";
// Importando rotas para o servidor.
import routes from "./routes";
// Importando validação de erro.
import errorHandle from "./erros/handle";
// Importando biblioteca para caminhos relativos.
import path from "path";
// Improta a conexão do banco de dados.
import "./database/connection";

// inicia a biblioteca express.
const app = express();
// Libera o acesso do cors.
app.use(cors());
// Permite que o express leia json.
app.use(express.json());

// Insere as rotas no servidor.
app.use(routes);

// Definindo rota para mostrar arquivos estáticos.
app.use( "/uploads", express.static( path.join( __dirname, "..", "uploads" ) ) );

// Usando o tratamento de excessões.
app.use(errorHandle);

// Inicia o servidor na porta 3333.
app.listen(3333);
