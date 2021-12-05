import connection from "../database/connection.js";


async function createRecommendation(name,youtubeLink){
    await connection.query('INSERT INTO recommendations (name,ytbLink) VALUES ($1,$2)',[name,youtubeLink]);
}

async function checkForExistentRec(id){
    const result = await connection.query('SELECT * FROM recommendations WHERE id = $1',[id]);
    return result.rows;
}

async function addPoint(id){
    const points = await connection.query('SELECT points FROM recommendations WHERE id = $1',[id]);
    if(points.rows[0].points === null){
        await connection.query('UPDATE recommendations SET points = 1 WHERE id = $1',[id]);
    }
    else{
        await connection.query('UPDATE recommendations SET points = points + 1 WHERE id = $1',[id]);
    }
}

async function dropPoint(id){
    const points = await connection.query('SELECT points FROM recommendations WHERE id = $1',[id]);
    if(points.rows[0].points === -5){
        await connection.query('DELETE FROM recommendations WHERE id = $1',[id])
    }
    else {
        await connection.query('UPDATE recommendations SET points = points - 1 WHERE id = $1',[id])
    }
}

async function getRandomRec({moreThan10}){
    let result;
    if(moreThan10){
        result = await connection.query('SELECT * FROM recommendations WHERE points > 10 ORDER BY RANDOM() LIMIT 1');
        return result.rows;
    }
    else{
        result = await connection.query('SELECT * FROM recommendations ORDER BY RANDOM() LIMIT 1');
        return result.rows;
    }
}

export {
    createRecommendation,
    checkForExistentRec,
    addPoint,
    dropPoint,
    getRandomRec,
}