import connection from "../database/connection.js";


async function createRecommendation(name,youtubeLink){

    const result = await connection.query('INSERT INTO recommendations (name,ytbLink) VALUES ($1,$2)',[name,youtubeLink]);

}



export {
    createRecommendation,
}