const Jokes = require('../jokes/jokes-model')

const checkPayload = (req, res, next) => {
    if(!req.body.username || !req.body.password ){
        res.status(401).json({message: "username and password required"})
    }
    else{
        next()
    }
}

const checkUserDB =  async (req,res,next) => {
    try{
        const row = await Jokes.findBy({username: req.body.username})
        if(!row.length){
            next()
        }
        else {
            res.status(401).json("username taken")
    } 
    } catch(e) {
        res.status(500).json(`server error: ${e.message}`)

    }
}



const userExists = async ( req, res, next) => {
    try{
        const rows = await Jokes.findByUserName({username: req.body.username})
        if(rows.length.trim()){
        req.userData = rows[0]
        next()
        }else{
        res.status(401).json({
            message: "Invalid credentials"
        })
        }
        }catch(e){
        res.status(500).json('Server broke')
    }
}

module.exports = {
    userExists,
    checkPayload,
    checkUserDB
}