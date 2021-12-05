import * as recommendationRepository from "../repository/recommendationRepository.js"
import { validationRecommendation } from "../schemmas/recomandationSchemma.js";

async function validateRec(name,youtubeLink){
    if(!name || !youtubeLink){
        return null;
    }
    const errors = validationRecommendation.validate({
        name,
        youtubeLink,
    }).error;
    if(errors){
        return null;
    }
    return true;
}

async function validateRecId(id){
    if(!id){
        return false;
    }
    const rec = await recommendationRepository.checkForExistentRec(id);
    if(rec.length > 0){
        return true;
    }
    else{
        return false;
    }
}

async function sendUpVote(id){
    await recommendationRepository.addPoint(id);
}

async function dropUpVote(id){
    await recommendationRepository.dropPoint(id);
}

async function registerRecInDB(name,youtubeLink){
    await recommendationRepository.createRecommendation(name,youtubeLink);
}


async function getRandom(){
    let randomNumber = Math.random();
    let recomendation;
    if(randomNumber > 0.3){
        recomendation = await recommendationRepository.getRandomRec({ moreThan10: randomNumber > 0.3 })
        if(recomendation.length === 0){
            recomendation = await recommendationRepository.getRandomRec();
        }
    }
    else{
        recomendation = await recommendationRepository.getRandomRec({moreThan10: false});
    }

    if(recomendation.length === 0){
        return null;
    }
    return recomendation;
}

async function getTopRec(amount){
    if(amount <= 0){
        return null;
    }
    const recommendations = await recommendationRepository.getTopRec(amount)
    if(recommendations.length === 0){
        return null;
    }
    return recommendations;
}


export {
    validateRec,
    registerRecInDB,
    validateRecId,
    sendUpVote,
    dropUpVote,
    getRandom,
    getTopRec,
}