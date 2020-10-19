import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1603058143512 implements MigrationInterface {
    // Realiza as alterações no banco de dados.
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria uma tabela, para isso recebe um objeto Table no parâmetro.
        // O objeto Table precisa receber um objeto no construtor.
        await queryRunner.createTable(new Table({
            name: "images",
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
                    name: "path",
                    type: "varchar"
                },
                {
                    name: "orphanage_id",
                    type: "integer"
                }
            ],
            // Chave estrangeiras.
            foreignKeys: [
                {
                    // Nome da chave.
                    name: "imageOrphanage",
                    // Nome da coluna que vai guardar o valor. (tem que ser um nome existente na coluna)
                    columnNames: ["orphanage_id"],
                    // Nome da tabale na qual tu tá fazendo referência.
                    referencedTableName: "orphanages",
                    // Nome da coluna que você vai estar usando como valor.
                    referencedColumnNames: ["id"],
                    // Sincroniza as chaves estrangeiras com a chave chave primaria da tabela da relação.
                    onUpdate: "CASCADE",
                    // Sincroniza a deleção.
                    onDelete: "CASCADE"
                }
            ]
        }));
    }

    // Desfaz as alterações no banco de dados.
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a tabela
        await queryRunner.dropTable("images");
    }
}
