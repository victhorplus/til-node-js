const axios = require('axios');
const base = 'https://swapi.dev/api';

async function getCharacters(nome){
    let url = `${base}/people?search=${nome}`;
    let response = await axios.get(url);
    return response.data;
}

module.exports = {
    getCharacters
}