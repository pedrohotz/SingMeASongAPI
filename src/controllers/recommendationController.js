import * as recommendationService from  "../services/recommendationService.js";

async function postRecommendation(req,res){
    const {name, youtubeLink} = req.body;
    try {
        const recommendation = await recommendationService.validateRec(name,youtubeLink);
        console.log(recommendation);
        if(recommendation){
            let rec =  await recommendationService.registerRecInDB(name,youtubeLink)
            res.send(rec).status(201);
        }
        else{
            res.sendStatus(400);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}


async function upVoteRecommendation(req,res){
    const { id } = req.params
    try {
        const isValidID = await recommendationService.validateRecId(id)
        if(isValidID){
           let rec = await recommendationService.sendUpVote(id);
           res.send(rec);
        }
        else{
            res.sendStatus(400);
        }  
    } catch (error) {
       res.sendStatus(500); 
    }
}

async function dropVoteRecommendation(req,res){
    const { id } = req.params
    try {
        const isValidID = await recommendationService.validateRecId(id)
        if(isValidID){
           let rec =  await recommendationService.dropUpVote(id)
            res.send(rec);
        }
        else{
            res.sendStatus(400)
        }
    } catch (error) {
        res.sendStatus(500);
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