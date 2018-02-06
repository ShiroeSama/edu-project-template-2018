const express = require('express');
const uuid = require('node-uuid');
const config = require('./../config.js');
const repository = require('./../Repository/EpisodeRepository.js');


var router = express.Router();

/*
    Method : POST
    Url : /api/episodes
    Description : Add Episode
 */
router.post('/', function (request, response) {
    let episode = request.body;

    if (episode) {
        episode.id = uuid.v4();
        repository.add(episode).then((episodes) => {
            response.status(201);
            response.send(episodes);
        }).catch((err) => {
            response.sendStatus(500);
        });
    } else {
        response.sendStatus(400);
    }
});

/*
    Method : PUT
    Url : /api/episodes/:id
    Description : Update Episode
 */
router.put('/:id', function (request, response) {
    let episode = repository.edit(request.params.id, request.body);

    repository.edit(request.params.id, request.body).then((episode) => {
        response.status(200);
        response.send(episode);
    }).catch((err) => {
        response.sendStatus(500);
    });
});

/*
    Method : GET
    Url : /api/episodes
    Description : Get List of Episodes
 */
router.get('/', function (request, response) {
    repository.findAll().then((episodes) => {
        response.status(200);
        response.send(episodes);
    }).catch((err) => {
        response.sendStatus(500);
    });
});

/*
    Method : GET
    Url : /api/episodes/:id
    Description : Get Episode
 */
router.get('/:id', function (request, response) {
    repository.findBy(request.params.id).then((episode) => {
        response.status(200);
        response.send(episode);
    }).catch((err) => {
        response.sendStatus(500);
    });
});

/*
    Method : DELETE
    Url : /api/episodes/:id
    Description : Delete Episode
 */
router.delete('/:id', function (request, response) {
    repository.delete(request.params.id).then(() => {
        response.sendStatus(204);
    }).catch((err) => {
        response.sendStatus(500);
    });
});



module.exports = router;