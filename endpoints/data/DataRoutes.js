const express = require("express")
const router = express.Router()
const {fields, courses, both} = require("../../config/config")

router.get("/fields", function(req, res){
    res.status(200).json(fields)
})

router.get("/courses", function(req, res){
    res.status(200).json(courses)
})

router.get("/both", function(req, res){
    res.status(200).json(both)
})

module.exports = router