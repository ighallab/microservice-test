import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import config from 'config';
import {injectable} from "inversify";

@injectable()
class JwtService {
    private secretKey: string = config.get('secretKey') || 'sampleKey';
    private defaultExpiry: string;


    constructor() {
        this.defaultExpiry = '1h';
    }

    //create a new JWT
    public createToken(payload: object, expiry?: string): string {
        const options: SignOptions = {
            expiresIn: expiry || this.defaultExpiry
        };
        return jwt.sign(payload, this.secretKey, options);
    }

    //validate and decode JWT
    public validateToken(token: string): JwtPayload | string | null {
        try {
            // Verify and decode the token
            return jwt.verify(token, this.secretKey);
        } catch (error:any) {
            console.error("Invalid token:", error.message);
            return null;
        }
    }

    //decode JWT without validating it
    public decodeToken(token: string): JwtPayload | null {
        return jwt.decode(token) as JwtPayload | null;
    }

    //extend the expiry of JWT
    public extendTokenExpiry(token: string, additionalTime: string): string | null {
        try {
            const decoded = jwt.decode(token) as JwtPayload;
            if (!decoded || !decoded.exp) {
                return null;
            }

            // Extend the expiry by decoding the token, adding more time, and re-signing
            const newExpiry = new Date(decoded.exp * 1000);
            newExpiry.setSeconds(newExpiry.getSeconds() + this.convertTimeToSeconds(additionalTime));

            // Create a new token with the updated expiry
            const newPayload = { ...decoded, exp: Math.floor(newExpiry.getTime() / 1000) };
            return this.createToken(newPayload);
        } catch (error: any) {
            console.error("Error extending token expiry:", error.message);
            return null;
        }
    }

    //helper function to convert time into seconds
    private convertTimeToSeconds(time: string): number {
        const regex = /(\d+)([smhd])/;
        const match = regex.exec(time);
        if (!match) {
            throw new Error("Invalid time format");
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        switch (unit) {
            case 's': return value;
            case 'm': return value * 60;
            case 'h': return value * 3600;
            case 'd': return value * 86400;
            default: throw new Error("Invalid time unit");
        }
    }
}

export {JwtService};
