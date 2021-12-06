import * as recommendationService from '../services/recommendationService.js';

// eslint-disable-next-line consistent-return
async function postRecommendation(req, res) {
  const { name, youtubeLink } = req.body;
  try {
    const recommendation = await recommendationService.validateRec(name, youtubeLink);
    if (recommendation) {
      const rec = await recommendationService.registerRecInDB(name, youtubeLink);
      return res.send(rec).status(201);
    }
    return res.sendStatus(400);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function upVoteRecommendation(req, res) {
  const { id } = req.params;
  try {
    const isValidID = await recommendationService.validateRecId(id);
    if (isValidID) {
      const rec = await recommendationService.sendUpVote(id);
      return res.send(rec);
    }
    return res.sendStatus(400);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function dropVoteRecommendation(req, res) {
  const { id } = req.params;
  try {
    const isValidID = await recommendationService.validateRecId(id);
    if (isValidID) {
      const rec = await recommendationService.dropUpVote(id);
      return res.send(rec);
    }
    return res.sendStatus(400);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getRandomRec(req, res) {
  try {
    const recomendation = await recommendationService.getRandom();
    if (!recomendation) {
      return res.sendStatus(404);
    }
    return res.status(200).send(recomendation);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getTop(req, res) {
  const { amount } = req.params;
  try {
    const recomendations = await recommendationService.getTopRec(amount);
    if (!recomendations) {
      return res.sendStatus(400);
    }
    return res.status(200).send(recomendations);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  postRecommendation,
  upVoteRecommendation,
  dropVoteRecommendation,
  getRandomRec,
  getTop,
};
