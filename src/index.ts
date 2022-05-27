import express, { Request, Response } from 'express';
import 'dotenv/config';

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = express();

app.disable('x-powered-by');

//Return Saved Number - GET

//Save Posted Number - POST

app.use('*', (_req: Request, res: Response) => {
    return res.status(404).send({ error: 'not found' });
});

const main = async (): Promise<void> => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Listening on port ${PORT}...`);
    });
};

main().catch(console.error);
