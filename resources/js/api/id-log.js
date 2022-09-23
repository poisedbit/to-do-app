"use strict";

export default class ID {
    static _keyName = 'id-log';

    static get log() {
        return load(this._keyName);
    }

    static generateID() {
        const log = this.log;
        let id;

        do {
            id = Math.floor(Math.random() * 100000);
        } while(log.includes(id))

        return id;
    }

    static insertID(id) {
        const log = this.log;

        log.push(id);
        save(this._keyName, log);
    }

    static deleteID(id) {
        const log = this.log;
        const index = log.indexOf(id);

        log.splice(index, 1);
        save(this._keyName, log);
    }
}

function load(keyName) {
    const jsonData = localStorage.getItem(keyName);

    if (!jsonData) {
        return []
    }

    return JSON.parse(jsonData);
}

function save(keyName, data) {
    const jsonData = JSON.stringify(data);

    localStorage.setItem(keyName, jsonData);
}