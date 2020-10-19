// Importa a biblioteca Router do express.
import { Router} from "express";
// Importando o controlador do modal Orphanage.
import OrphanagesController from "./controllers/OrphanagesController";
// Importando a biblioteca para upload de img.
import multer from "multer";
// Configuração que será usada no upload.
import uploadConfig from "./config/upload";

// Inicia a biblioteca.
const routes = Router();
// Inicia o multer.
const upload = multer(uploadConfig);


// Define uma rota.
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);

routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

// Exportando as rotas criadas
export default routes;
