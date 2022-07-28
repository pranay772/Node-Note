const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title) //helps to find duplicacy of notes

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold.italic.inverse('New note added!'))
    } else {
        console.log(chalk.red.bold.italic.inverse("Can't add, note already exists!"))
    }
}

const removeNote = (title) => {               //used to remove notes(existing)
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.bold.italic.inverse('Note successfully removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.bold.italic.inverse('No such note found!'))
    }    
}

const listNotes = () => {               //used to list all notes (existing)
    const notes = loadNotes()

    console.log(chalk.cyan.bold.italic.inverse("Here's the list of all existing notes"))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const showNote = (title) => {           //used to print note's content on CLI
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.magenta.bold.italic.inverse(note.title))
        console.log(chalk.yellow(note.body))
    } else {
        console.log(chalk.red.bold.italic.inverse('No such note not found!'))
    }
}

const saveNotes = (notes) => {         //saves file to json file
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {           //converts json file to string and then parses it back to object form
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {             //exports all functins to app.js
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    showNote: showNote
}