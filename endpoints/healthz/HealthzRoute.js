let express = require("express")
let router = express.Router()
const healthzService = require('./HealthzService')

router.get("/", (req, res) => {
    healthzService.getDBStatus((err, status) =>{
        if (err){
            res.status(500).json({
                Error: err,
                message: "DB isn't connected"
            })
        } else if (status){
            res.status(200).json({
                message: "All systems operational",
                dbstatus: status
            })
        } else {
            res.status(500).json({
                Error: "DB isn't connected"
            })
        }
    })
})

module.exports = router;
