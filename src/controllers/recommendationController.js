import * as recommendationService from  "../services/recommendationService.js";

async function postRecommendation(req,res){
    const {name, youtubeLink} = req.body;
    const recommendation = recommendationService.validateRec(name,youtubeLink)

    if(recommendation){
        await recommendationService.registerRecInDB(name,youtubeLink)
        res.sendStatus(201);
    }

}


export {
    postRecommendation,
}