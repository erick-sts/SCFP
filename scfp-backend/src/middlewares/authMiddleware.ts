import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Obtém a chave secreta para JWT das variáveis de ambiente
const JWT_SECRET = process.env.JWT_SECRET as string;

// Verifica se a chave secreta foi definida
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}

// Interface que define a estrutura do payload do JWT
interface JwtPayload {
    id: number;
}

// Middleware para autenticação usando JWT
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {

    // Obtém o cabeçalho de autorização da requisição
    const authHeader = req.headers.authorization;
    console.log('Cabeçalho de Autorização:', authHeader); // Log do cabeçalho de autorização para depuração

    // Verifica se o cabeçalho de autorização está presente
    if (authHeader) {
        // Extrai o token do cabeçalho de autorização
        const token = authHeader.split(' ')[1];
        console.log('Token:', token); // Log do token para depuração

        // Verifica e decodifica o token usando a chave secreta
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                console.log('Erro na verificação do token:', err); // Log do erro de verificação do token
                return res.sendStatus(403); // Retorna status 403 (Proibido) se a verificação falhar
            }

            // Define o ID do usuário na requisição para ser usado em outros middlewares ou rotas
            req.userId = (user as JwtPayload).id;
            console.log('ID do usuário do token:', req.userId); // Log do ID do usuário para depuração
            next(); // Chama o próximo middleware ou rota
        });
    } else {
        console.log('Não autorizado'); // Log quando o cabeçalho de autorização está ausente
        res.sendStatus(401); // Retorna status 401 (Não Autorizado) se o cabeçalho de autorização estiver ausente
    }
};
