import express from "express";
import cors from 'cors';
import * as recommendationController from './controllers/recommendationController.js';
const app = express();

app.use(cors());
app.use(express.json());

app.post('/recommendation', recommendationController.postRecommendation);


export default app;