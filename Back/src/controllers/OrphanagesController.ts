import { Request, Response } from "express";
// Importando a classe para podermos adicionar os dados no banco de dados.
import { getRepository } from "typeorm";
// Importando biblioteca para validar erros.
import * as Yup from "yup";
// Importando o modal do banco de dados.
import Orphanage from "../models/orphanages";
// Importando a view do orphanage.
import orphanageView from "../views/orphanages_view";


export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        // Busca todos os dados.
        const orphanages = await orphanagesRepository.find({
            relations: ["images"]
        });

        return res.json(orphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        // Busca um dado pelo id.
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ["images"]
        });

        return res.json(orphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map((image) => ({ path: image.filename }) );

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        // Usando o Yup para definer os tipos dos camos e se é obrigatório.
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array( Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        // Valida se os dados passado corresponde ao o que foi de definido ali em cima.
        await schema.validate(data, {
            // Faz com que a resposta de erro vá com todos os erros.
            abortEarly: false
        })

        // Cria um dado.
        const orphanage = orphanagesRepository.create(data);

        // Salva o dado criado no servidor.
        await orphanagesRepository.save(orphanage);

        return res.status(201).json(orphanage);
    }
}