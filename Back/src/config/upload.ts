// Importando a biblioteca para upload de img.
import multer from "multer";
// Importando biblioteca para caminhos relativos.
import path from "path";

export default {
    // Configuração de onde e como será salvo.
    storage: multer.diskStorage({
        destination: path.join(__dirname, "..", "..", "uploads"),
        filename: (req, file, cb) => {
            // Altera o nome do arquivo passando a data de upload antes.
            const fileName = `${Date.now()}-${file.originalname}`;

            // Call back, primeiro valor é um erro e o segundo resultado.
            // Nesse caso não vamos precisar passar erro.
            cb(null, fileName);
        }
    })
};
