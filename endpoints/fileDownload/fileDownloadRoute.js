var express = require("express")
var router = express.Router()
var zip = require('express-zip')
var path = require("path")

router.get("/", (req,res,)=>{
    res.sendFile(path.join(__dirname + "/download.html"))
})

router.get("/single", (req, res) => {
    console.log("single file")
    res.download(__dirname + "/../../uploadFilesAufgabe 1.pdf", function (err) {
        if (err) {
            console.log(err)
        }
    })
})

router.get('/multiple', (req, res) =>{
    console.log('Multiple file download')
 
    res.zip([
           { path: __dirname +'/../../uploadFilesAufgabe 1.pdf',
               name: 'Aufgabe 1.pdf'},
           { path: __dirname +'/../../uploadFilesProjekt Pitch Spidergang.pdf',
               name: 'Projekt Pitch Spidergang.pdf'},
    ])
})
module.exports = router