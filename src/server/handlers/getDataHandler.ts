import { Request, Response } from 'express';

export const getDataHandler = async (req: Request, res: Response) => {
    try {
        res.status(200).json([
            { id: 'Yes', value: 25 },
            { id: 'Yes!', value: 70 },
        ]);
    } catch (error) {
        console.error(error);
        res.status(400);
    }
}