import jwt from 'jsonwebtoken'

export const protectToken = async (req,res,next) => {
    let token;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
        }
    
        if(!token){
            return res.status(403).json({ message: "No estas autorizado" })
        }
    
        const decoded = await jwt.verify(token, 'cualquiercosa')
    
        req.userId = decoded.id

        return next()

    } catch (error) {
        res.status(400).json({ error })
    }


  
}

