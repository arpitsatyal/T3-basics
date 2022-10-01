import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'kingcrimson';

export function signJWT(data: object) {
    return jwt.sign(data, SECRET);
}

export function verifyJWT<T>(token: string) {
    return jwt.sign(token, SECRET) as T;
}
