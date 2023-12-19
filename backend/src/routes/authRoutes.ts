import { Request, Response, Router } from 'express';

export const authRoutes = (app: Router) => {
    app.get('/login', async (req: Request, res: Response) => {});
};
