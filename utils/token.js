import jwt from "jsonwebtoken";

const createToken = ({_id, email}) => {
    const token = jwt.sign({_id, email}, process.env.SECRET_KEY, {
        expiresIn: 3600000
    });
    return token;
};

export default createToken;