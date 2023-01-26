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
        if(hero.id <= 2) return true;

        const list = await this.get();
        const id = Date.now();
        hero = { ...hero, id };
        list.push(hero);

        try{
            await this.writeDatabase(list);
            return true;
        }catch(err){
            console.error(err)
            return false;
        }
    }
}

module.exports = new Database();