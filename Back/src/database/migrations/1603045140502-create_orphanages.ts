import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1603045140502 implements MigrationInterface {
    // Realiza as alterações no banco de dados.
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria uma tabela, para isso recebe um objeto Table no parâmetro.
        // O objeto Table precisa receber um objeto no construtor.
        await queryRunner.createTable(new Table({
            // Nome da Tabela.
            name: "orphanages",
            // Colunas da tabela, cada coluna é um objeto.
            columns: [
                {
                    name: "id",
                    type: "integer",
                    // Define que o valor não pode ser negativo.
                    unsigned: true,
                    // Define essa coluna como a Primary Key.
                    isPrimary: true,
                    // Define que essa coluna vai ser auto completada.
                    isGenerated: true,
                    // Define que o modo de alto completar é em incremento.
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "latitude",
                    type: "decimal",
                    // Números antes da virugla.
                    scale: 10,
                    // Números depois da vírgula.
                    precision: 2
                },
                {
                    name: "longitude",
                    type: "decimal",
                    scale: 10,
                    precision: 2
                },
                {
                    name: "about",
                    type: "text"
                },
                {
                    name: "instructions",
                    type: "text"
                },
                {
                    name: "opening_hours",
                    type: "varchar"
                },
                {
                    name: "open_on_weekends",
                    type: "boolean",
                    // Valor padrão do campo.
                    default: false
                }
            ]
        }));
    }

    // Desfaz as alterações no banco de dados.
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a tabela
        await queryRunner.dropTable("orphanages");
    }

}
