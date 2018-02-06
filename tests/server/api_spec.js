const fs = require('fs');
const frisby = require('frisby');
const path = require('path');
const Joi = frisby.Joi;
const dal = require('../../src/server/Repository/EpisodeRepository');

const URL = `http://localhost:${process.env.SERVER_PORT}/api/episodes`;
const DATA_DIR = process.env.DATA;

function createFakeEpisode(done) {
    Promise.all([
        dal.add(
            {id: "1111-2222", name: "Breaking Bad", code: "S01E01", note: 8}
        ),
        dal.add(
            {id: "1111-3333", name: "Lethal Weapon", code: "S01E01", note: 7}
        )
    ]).then(() => {
        done();
    });
}

function deleteFakeEpisode(done) {
    fs.readdir(DATA_DIR, (err, files) => {
        if (err) {
            done();
            throw err
        }
        for (const file of files) {
            fs.unlink(path.join(DATA_DIR, file), err => {
                if (err) {
                    done();
                    throw err
                }
            });
            done();
        }
    });
}


/*
    Method : POST
    Url : /api/episodes
    Description : Add Episode
 */
describe('POST : Add Episode', () => {
    let id;
    it('Should make an http request', (done) => {
        frisby.post(`${URL}/`, {
            name: "Blindspot",
            code: "S03E02",
            note: 5
        })
        .expect('status', 201)
        .expect('jsonTypes', {
            'id': Joi.string().required(),
            'name': Joi.string().required(),
            'code': Joi.string().required(),
            'note': Joi.number().required()
        }).then((res) => {
            id = res.body.id;
        })
        .done(done);
    });

    it('Should have file in data', (done) => {
        fs.stat(path.join(DATA_DIR, `${id}.json`), (err, stats) => {
            if (err || !stats.isFile()) {
                fail();
            }
            done();
        });
    });

    afterAll((done) => {
        deleteFakeEpisode(done);
        done();
    });
});


/*
    Method : PUT
    Url : /api/episodes/:id
    Description : Update Episode
 */

describe('PUT : Update Episode', () => {
    beforeAll((done) => {
        createFakeEpisode(done);
    });

    it('Should make an http request', (done) => {
        frisby.put(`${URL}/1111-2222`, {
            note: 5
        })
        .expect('status', 200)
        .expect('jsonTypes', {
            'id': Joi.string().required(),
            'name': Joi.string().required(),
            'code': Joi.string().required(),
            'note': Joi.number().required()
        }).then((res) => {
            let score = res.body.note;

            expect(score).toEqual(5);
        })
        .done(done);
    });

    afterAll((done) => {
        deleteFakeEpisode(done);
    });
});


/*
    Method : GET
    Url : /api/episodes
    Description : Get List of Episodes
 */
describe('GET : Get List of Episodes', () => {
    beforeAll((done) => {
        createFakeEpisode(done);
    });

    it('Should make an http request', (done) => {
        frisby.get(`${URL}/`)
        .expect('status', 200)
        .expect('jsonTypes', '*', {
            'id': Joi.string().required(),
            'name': Joi.string().required(),
            'code': Joi.string().required(),
            'note': Joi.number().required()
        })
        .then((res) => {
            let datas = res.body;

            expect(datas.length).toEqual(2);
            expect(datas).toEqual(jasmine.any(Array));
        })
        .done(done);
    });

    afterAll((done) => {
        deleteFakeEpisode(done);
    });
});


/*
     Method : GET
     Url : /api/episodes/:id
     Description : Get Episode
 */
describe('GET : Get Episode', () => {
    beforeAll((done) => {
        createFakeEpisode(done);
    });

    it('Should make an http request', (done) => {
        frisby.get(`${URL}/1111-2222`)
            .expect('status', 200)
            .expect('jsonTypes', {
                'id': Joi.string().required(),
                'name': Joi.string().required(),
                'code': Joi.string().required(),
                'note': Joi.number().required()
            })
            .then((res) => {
                let data = res.body;

                expect(data.id).toEqual("1111-2222");
                expect(data.name).toEqual("Breaking Bad");
                expect(data.code).toEqual("S01E01");
                expect(data.note).toEqual(8);
            })
            .done(done);
    });

    afterAll((done) => {
        deleteFakeEpisode(done);
    });
});


/*
    Method : DELETE
    Url : /api/episodes/:id
    Description : Delete Episode
 */
describe('DELETE : Delete Episode', () => {
    beforeAll((done) => {
        createFakeEpisode(done);
    });

    it('Should make an http request', (done) => {
        frisby.del(`${URL}/1111-2222`)
            .expect('status', 204)
            .done(done);
    });

    it('Should make an http request to take all elements', (done) => {
        frisby.get(`${URL}/`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                'id': Joi.string().required(),
                'name': Joi.string().required(),
                'code': Joi.string().required(),
                'note': Joi.number().required()
            })
            .then((res) => {
                let datas = res.body;

                expect(datas.length).toEqual(1);
                expect(datas).toEqual(jasmine.any(Array));
            })
            .done(done);
    });

    afterAll((done) => {
        deleteFakeEpisode(done);
    });
});
