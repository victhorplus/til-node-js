const commander = require('commander');
const database = require("./database");
const Hero = require("./class/hero");

async function main(){
    commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do herói')
        .option('-p, --poder [value]', 'Poder do herói')
        
        .option('-c, --cadastrar', "Cadastrar herói")
        .option('-l, --listar', "listar herói")
        .parse(process.argv)

    try{
        let hero = new Hero(commander._optionValues);

        if(commander._optionValues.cadastrar){
            const result = await database.addHero(hero);
            result?
                console.log("Heroi cadastradado com sucesso"):
                console.error("Herói não foi cadastrado")
        }
        if(commander)
    }catch(err){
        console.log("Erro comander", err)
    }
}

main();