// eu faco a validacao do token na pagina sensivel antes de rodar ela

'use server'

import {cookies} from 'next/headers'
import jwt from "jsonwebtoken";

export async function ValidarToken()
{
    const cookieList = await cookies();
    const token = cookieList.get("token")?.value;

    if (!token)
        return {autenticado: false};

    else{
        try{
            const resultado = jwt.verify(token, process.env.JWT_SECRET!);
            return {autenticado: true};
        }
        catch{
            return {autenticado: false};
        }
    }
}