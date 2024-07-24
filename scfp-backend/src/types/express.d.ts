import { Request } from 'express';

// Extensão do tipo Request do Express para adicionar a propriedade userId
declare module 'express' {
    export interface Request {
        userId?: number; 
    }
}
