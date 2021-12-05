import express from "express";
import cors from 'cors';
import * as recommendationController from './controllers/recommendationController.js';
const app = express();

app.use(cors());
app.use(express.json());

app.post('/recommendations', recommendationController.postRecommendation);
app.post('/recommendations/:id/upvote', recommendationController.upVoteRecommendation);
app.post('/recommendations/:id/downvote', recommendationController.dropVoteRecommendation);
app.get('/recommendations/random', recommendationController.getRandomRec);
app.get('/recommendations/top/:amount', recommendationController.getTop);


export default app;