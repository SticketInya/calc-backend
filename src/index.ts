import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';
import cors from 'cors';
import { SavedNum } from './intrerfaces/SaveNumberInterface';

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = express();
const allNumbers = [] as Array<SavedNum>;

app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

//Return Saved Number - GET
app.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const foundNumber = allNumbers.find((num) => num.id === id);
    if (!foundNumber) {
        return res.status(404).send({ error: 'number not found' });
    }
    return res.status(200).send(foundNumber);
});

//Save Posted Number - POST
app.post('/save', (req: Request, res: Response) => {
    const { impNumber } = req.body as { impNumber: number };
    if (isNaN(impNumber)) {
        return res.status(400).send({ error: 'not a number' });
    }
    const newNumberEntry = {
        id: uuidv4(),
        number: impNumber,
    };
    allNumbers.push(newNumberEntry);
    return res.status(201).send(newNumberEntry);
});

app.use('*', (_req: Request, res: Response) => {
    return res.status(404).send({ error: 'not found' });
});

const main = async (): Promise<void> => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Listening on port ${PORT}...`);
    });
};

main().catch(console.error);
