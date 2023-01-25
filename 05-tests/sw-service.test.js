const assert = require("assert");
const nock = require("nock");
const service = require("./sw-service.js");

describe("Star wars service test", function(){
    const mockResponse = {
            results: [
                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.dev/api/planets/8/',
                    created: '2014-12-10T15:11:50.376000Z',       
                    edited: '2014-12-20T21:17:50.311000Z',        
                    url: 'https://swapi.dev/api/people/3/'        
                }
            ]
    }
    
    it("getCharacters() function shold return R2-D2 in correct format", async () => {
        let mockName = 'R2-D2';
        let expected = [
            {
                nome: 'R2-D2',
                altura: '96',
                peso: '32'
            }
        ];
        
        nock('https://swapi.dev/api')
            .get('/people?search=R2-D2')
            .reply(200, mockResponse)

        let result = await service.getCharacters(mockName);
        
        assert.deepEqual(result, expected);
    }).timeout(5000)
})