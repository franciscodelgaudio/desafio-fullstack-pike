import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";

const segredo = process.env.JWT_SECRET!;

export default function CriarToken(payload : object)
{
    return jwt.sign(payload, segredo, {expiresIn: '1h'});
}

export async function LerToken()
{
    const cookieList = await cookies();
    const token = cookieList.get("token")?.value;

    if (!token)
        return {autenticado: false};

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        return {autenticado: true, payload};
    }
    catch{
        return {autenticado: false};
    }
}