import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const authHeader = req.get('Authorization')

    // If there is no authorization header, set isAuth to false and go to the next middleware
    if (!authHeader) {
        req.isAuth = false
        return next()
    }
    
    const token = authHeader.split(' ')[1]
    let decodedToken

    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (err) {
        req.isAuth = false
        return next()
    }

    // If the decoded token is undefined, set isAuth to false

    if (!decodedToken) {
        req.isAuth = false
        return next()
    }
    
    // If we make it here, set isAuth to true
    req.userId = decodedToken.userId
    req.isAuth = true
    next()
}