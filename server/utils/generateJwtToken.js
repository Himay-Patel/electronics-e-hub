import jwt from 'jsonwebtoken'

const generateJwtToken = (_id, username, email, expiresIn = "30d") => {
    return jwt.sign({ _id, username, email }, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
    });
}

export default generateJwtToken;