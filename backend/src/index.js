import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import router from './routes/v1';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1', router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.info(`API server listening on port ${port}`);
});

export default app;
