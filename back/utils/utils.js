'use strict';

const fs = require('fs').promises;
const jsonfile = require('jsonfile');

exports.calculateTf = async (snippet) => {
    if (snippet == null) return;

    var tf = []; // fichier json avec mot + nombre d'occurrences

    let snippetInformations = `${snippet.Title} ${snippet.Desc}`;
    let wordArray = snippetInformations.split(' ');

    addWords(wordArray, tf);

    if (snippet.Files != null) {
        for (const file of snippet.Files) {
            try {
                const data = await fs.readFile(`${appRoot}/${file.Url}`, 'utf8');
    
                let dataPunctuationLess = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\']/g, '');
                let finalString = dataPunctuationLess.replace(/\s{2,}/g, ' ');
                let wordArray = finalString.split(' ');
    
                addWords(wordArray, tf);
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }
    try { 
        // write file
        await jsonfile.writeFile(`${appRoot}/${snippet.Repository}/tf.json`, tf, { spaces: 2, EOL: '\r\n' });
    } catch(err) {
        console.log(err);
        return false;
    }
    return true;
};

exports.isNullOrEmpty = (data) => {
    return data == null || data == ''; 
};

exports.capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

exports.sequelizeObjectToJson = function (object) {
    return JSON.parse(JSON.stringify(object));
}

function addWords(wordArray, tf) {
    wordArray.forEach(w => {
        if (!tf.some(e => e.word == w))
        {
            let count = countWord(w, wordArray);
            tf.push({ word: w, count: count });
        }
    });
}

function countWord(word, wordArray) {
    let count = 0;
    wordArray.forEach(w => {
        if (w == word) count++;
    });
    return count;
}