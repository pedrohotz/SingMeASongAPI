import * as recommendationService from  "../services/recommendationService.js";

async function postRecommendation(req,res){
    const {name, youtubeLink} = req.body;
    const recommendation = await recommendationService.validateRec(name,youtubeLink);
    if(recommendation){
        await recommendationService.registerRecInDB(name,youtubeLink)
        res.sendStatus(201);
    }
    else{
        res.sendStatus(400);
    }
}


async function upVoteRecommendation(req,res){
    const { id } = req.params
    const isValidID = await recommendationService.validateRecId(id)
    if(isValidID){
       await recommendationService.sendUpVote(id);
       res.sendStatus(200);
    }
    else{
        res.sendStatus(400);
    }
    
}

async function dropVoteRecommendation(req,res){
    const { id } = req.params
    const isValidID = await recommendationService.validateRecId(id)
    if(isValidID){
        await recommendationService.dropUpVote(id)
        res.sendStatus(200)
    }
    else{
        res.sendStatus(400)
    }
}

async function getRandomRec(req,res){
    try {
        const recomendation = await recommendationService.getRandom()
        if(!recomendation){
            return res.sendStatus(404);
        }
        return res.status(200).send(recomendation);
    } catch (error) {
        return res.sendStatus(500);
    }
}

async function getTop(req,res){
    const { amount } = req.params;
    try {
        const recomendations = await recommendationService.getTopRec(amount);
        if(!recomendations){
            res.sendStatus(400);
        }
        return res.status(200).send(recomendations)
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    postRecommendation,
    upVoteRecommendation,
    dropVoteRecommendation,
    getRandomRec,
    getTop,
}