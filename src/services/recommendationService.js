import * as recommendationRepository from "../repository/recommendationRepository.js"
import { validationRecommendation } from "../schemmas/recomandationSchemma.js";

async function validateRec(name,youtubeLink){
    console.log(name,youtubeLink)
    if(!name || !youtubeLink){
        console.log('aaaaa')
        return null;
    }
    const errors = validationRecommendation.validate({
        name,
        youtubeLink,
    }).error;
    if(errors){
        return null;
    }
    let rec = await recommendationRepository.chekcForExistentRecByName(name);
    if(rec){
        return null;
    }
    return true;
}

async function validateRecId(id){
    if(!id){
        return false;
    }
    const rec = await recommendationRepository.checkForExistentRec({id});
    if(rec){
        return true;
    }
    else{
        return false;
    }
}

async function sendUpVote(id){
    let rec = await recommendationRepository.addPoint({id});
    return rec;
}

async function dropUpVote(id){
    let rec = await recommendationRepository.dropPoint({id});
    return rec;
}

async function registerRecInDB(name,youtubeLink){
     let rec = await recommendationRepository.createRecommendation({name,youtubeLink});
     return rec;
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
    const recommendations = await recommendationRepository.getTopRec({amount})
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