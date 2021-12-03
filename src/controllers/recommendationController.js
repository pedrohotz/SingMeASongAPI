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

export {
    postRecommendation,
    upVoteRecommendation,
    dropVoteRecommendation,
}