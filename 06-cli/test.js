const { deepEqual, ok } = require("assert");
const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
};

describe("database test", function(){
    it("Deve listar o herói pelo ID", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;

        const [result] = await database.get(expected.id);

        deepEqual(expected, result);
    });

    it("Deve cadastrar um heroi usando arquivos", async () => {
        const result = await database.addHero(DEFAULT_ITEM_CADASTRAR);
        const [newHero] = await database.get(DEFAULT_ITEM_CADASTRAR.id);

        ok(result);
        deepEqual(DEFAULT_ITEM_CADASTRAR, newHero);
    })
})