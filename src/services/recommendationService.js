import * as recommendationRepository from "../repository/recommendationRepository.js"

async function validateRec(name,youtubeLink){
    if(!name || !youtubeLink){
        return null;
    }
}




async function registerRecInDB(name,youtubeLink){
    await recommendationRepository.createRecommendation(name,youtubeLink);
}


export {
    validateRec,
    registerRecInDB,
}