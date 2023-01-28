const { deepEqual, ok } = require("assert");
const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
};
const DEFAULT_ITEM_ALTERAR = {
    id:2,
    nome:"batman",
    poder:"Dinheiro"
};

describe("database test", function(){
    this.beforeEach(async () => {
        await database.addHero(DEFAULT_ITEM_CADASTRAR);
        await database.addHero({id:2,nome:"batman",poder:"Dinheiro"})
    });

    it("should create", () =>{
        ok(true)
    });

    it("Deve listar o herói pelo ID", async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;

        const [result] = await database.get(expected.id);

        deepEqual(expected, result);
    });

    it("Deve cadastrar um heroi usando arquivos", async () => {
        const result = await database.addHero(DEFAULT_ITEM_CADASTRAR);
        const [expected] = await database.get(DEFAULT_ITEM_CADASTRAR.id);

        ok(result);
        deepEqual(DEFAULT_ITEM_CADASTRAR, expected);
    });

    it("Deve remover um heroi usando arquivos", async () => {
        const result = await database.deleteHero(DEFAULT_ITEM_CADASTRAR.id);
        const expected = await database.get(DEFAULT_ITEM_CADASTRAR.id);

        ok(result);
        deepEqual(expected, []);
    });

    it("Deve remover todos os heróis usando arquivos", async () => {
        const result = await database.deleteHero();
        const expected = await database.get();

        ok(result);
        deepEqual(expected, []);
    });

    it("Deve atualizar um herói usando arquivos", async () => {
        const expected = {
            ...DEFAULT_ITEM_ALTERAR,
            nome: "Batman que ri"
        };
        const result = await database.updateHero(DEFAULT_ITEM_ALTERAR, expected);

        deepEqual(result, expected)
    })
})