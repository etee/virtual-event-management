import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";
import { ERR_MISSING_AUTH_HEADER, ERR_TOKEN_VERIFICATION, HTTP_CODES } from "../constants";
import { readFromDatabase } from "../utils/file-transactions";
import { User } from "../models/user.model";

const verificationToken = (req: any, res: any, next: any) => {
    const authHeader = req?.headers?.authorization;
    if(authHeader && JWT_SECRET) {
        jsonwebtoken.verify(authHeader, JWT_SECRET, async (err: any, decoded: any) => {
            if(err) {
                req.user = undefined;
                return res.status(HTTP_CODES.UNAUTHORIZED).json({
                    error: ERR_TOKEN_VERIFICATION
                });
            } else {
                const dataFromDB = await readFromDatabase();
                req.user = dataFromDB.users.find((user: User) => user.id === decoded.id);
                next();
            }
        });
        
    } else {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({
            error: ERR_MISSING_AUTH_HEADER
        });
    }
}

export { verificationToken };