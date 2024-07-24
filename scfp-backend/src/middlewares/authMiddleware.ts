import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}

interface JwtPayload {
    id: number;
}

// Middleware para autenticação usando JWT
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {

    // Obtém o cabeçalho de autorização da requisição
    const authHeader = req.headers.authorization;
    console.log('Cabeçalho de Autorização:', authHeader); 

    // Verifica se o cabeçalho de autorização está presente
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('Token:', token); 

        // Verifica e decodifica o token usando a chave secreta
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                console.log('Erro na verificação do token:', err); 
                return res.sendStatus(403);
            }

            // Define o ID do usuário na requisição para ser usado em outros middlewares ou rotas
            req.userId = (user as JwtPayload).id;
            console.log('ID do usuário do token:', req.userId);
            next(); // Chama o próximo middleware ou rota
        });
    } else {
        console.log('Não autorizado'); 
        res.sendStatus(401); 
    }
};
