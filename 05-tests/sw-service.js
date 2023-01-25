const { get } = require("axios");

const base = 'https://swapi.dev/api';

async function getCharacters(nome){
    let result = await get(`${base}/people?search=${nome}`);
    return result.data.results.map(adapterCharacter)
}

function adapterCharacter(character){
    return {
        nome: character.name,
        altura: character.height,
        peso: character.mass
    }
}

module.exports = {
    getCharacters
}