const Jokes = require('../jokes/jokes-model')

const userExists = async (req, res, next) => {
    try{
        const rows = await Jokes.findByUsername({
            username: req.body.username
        })
        if(rows.length.trim()) {
            req.userData = rows[0]
            next()
        } else {
            res.status(401).json({
                message: 'Invalid'
            })
        }
    } catch(e) {
        res.status(500).json({
            message: 'server error'
        })
    }
}

const checkPayload = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        res.status(401).json({
            message: 'need username and password'
        })
    } else {
        next()
    }
}

const checkUserDB = async (req, res, next) => {
    try{
        const row = await Jokes.findBy({username: req.body.username})
        if(!row.length){
            next()
        }
        else {
            res.status(401).json("username already exists")
    } 
    } catch(e) {
        res.status(500).json(`server error: ${e.message}`)

    }
}

module.exports = {
    userExists,
    checkPayload,
    checkUserDB
}