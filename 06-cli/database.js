const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor(){
        this.base_url = `heroes.json`
    }

    async readDatabase(){
        const result = await readFileAsync(this.base_url, 'utf8');
        return JSON.parse(result);
    }

    async writeDatabase(data){
        await writeFileAsync(this.base_url, JSON.stringify(data));
        return true;
    }

    async get(id = undefined){
        let list = await this.readDatabase();
        let filteredList = list.filter(hero => id? hero.id === id: true);
        return filteredList;
    }

    async addHero(hero){
        const list = await this.get();
        const id = hero.id || Date.now();
        hero = { ...hero, id };
        
        let aux = await this.get(hero.id);
        if(aux.length > 0) return true;
        list.push(hero);

        try{
            await this.writeDatabase(list);
            return true;
        }catch(err){
            console.error(err)
            return false;
        }
    }

    async deleteHero(id){
        if(!id) {
            return await this.writeDatabase([]);
        }
        
        let list = await this.get();
        let indice = list.findIndex((hero) => hero.id == id);
        
        if(indice < 0){
            throw new Error("O heroi informado não existe")
        }
        list.splice(indice, 1)
        await this.writeDatabase(list);
        return true;
    }

    async updateHero(oldHero, newHero){
        let list = await this.readDatabase();
        let indice = list.findIndex(hero => hero.id == oldHero.id );
        if(indice < 0) throw new Error("O heroi informado não existe");
        
        list[indice] = {
            ...oldHero,
            ...newHero
        }
        await this.writeDatabase(list);

        return list[indice];
    }
}

module.exports = new Database();