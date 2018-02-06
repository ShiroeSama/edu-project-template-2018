const config = require('./../config.js');
const fs = require('fs');

class EpisodeRepository {
    constructor() {
        this.prohibitedFiles = ['.gitkeep'];
    }

    readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(config.data + '/' + filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                data = JSON.parse(data);
                if(data != "undefined") {
                    resolve(data);
                } else {
                    reject(null);
                }
            });
        });
    }

    writeFile(filePath, datas) {
        return new Promise((resolve, reject) => {
           fs.writeFile(config.data + '/' + filePath, JSON.stringify(datas), (err) => {
               if (err) {
                   reject(err);
                   return
               }
               resolve(datas);
           });
        });
    }

    deleteFile(filePath) {
        return new Promise((resolve, reject) => {
            let path = config.data + '/' + filePath;
            fs.stat(path, (err, file) => {
                if (err) {
                    reject(err);
                    return
                }

                if(file) {
                    fs.unlink(path, (err) => {
                        if (err) {reject(err);}
                    });

                    resolve();
                }
            });
        });
    }

    findAll() {
        return new Promise((resolve, reject) => {
            const prohibitedFiles = this.prohibitedFiles;
            const readFile = this.readFile;

            fs.readdir(config.data, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }

                const filesFiltered = files.filter((file) => {
                     return prohibitedFiles.indexOf(file) == -1
                });

                Promise.all(filesFiltered.map((file) => {
                    return readFile(file);
                })).then((episodes) => {
                    resolve(episodes);
                });
            });
        });
    }

    findBy(id) {
        return this.readFile(`${id}.json`);
    }

    add(object) {
        return new Promise((resolve, reject) => {
            let episode = object;

            this.writeFile(`${episode.id}.json`, episode).then((episode) => {
                resolve(episode);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    edit(id, newValues) {
        return new Promise((resolve, reject) => {
            this.findBy(id).then((episode) => {
                if (newValues.note != "undefined") { episode.note = newValues.note; }
                episode.id = id;

                this.writeFile(`${episode.id}.json`, episode).then((episode) => {
                    resolve(episode);
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    delete(id) {
        return this.deleteFile(`${id}.json`);
    }
}

var repository = new EpisodeRepository();
module.exports = repository;
