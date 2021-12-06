import connection from '../database/connection.js';

async function createRecommendation({ name, youtubeLink }) {
  const result = await connection.query('INSERT INTO recommendations (name,ytbLink,points) VALUES ($1,$2,0) RETURNING *', [name, youtubeLink]);
  return result.rows[0];
}

async function chekcForExistentRecByName(name) {
  const result = await connection.query('SELECT * FROM recommendations WHERE name = $1', [name]);
  if (!result) {
    return null;
  }
  return result.rows[0];
}

async function checkForExistentRec({ id }) {
  const result = await connection.query('SELECT * FROM recommendations WHERE id = $1', [id]);
  if (!result) {
    return null;
  }
  return result.rows[0];
}

async function addPoint({ id }) {
  let result;
  const points = await connection.query('SELECT points FROM recommendations WHERE id = $1', [id]);
  if (points.rows[0].points === null) {
    result = await connection.query('UPDATE recommendations SET points = 1 WHERE id = $1 RETURNING *', [id]);
  } else {
    result = await connection.query('UPDATE recommendations SET points = points + 1 WHERE id = $1 RETURNING *', [id]);
  }
  if (!result) {
    return null;
  }
  return result.rows[0];
}

async function dropPoint({ id }) {
  let result;
  const points = await connection.query('SELECT points FROM recommendations WHERE id = $1', [id]);
  if (points.rows[0].points === -5) {
    await connection.query('DELETE FROM recommendations WHERE id = $1', [id]);
  } else {
    result = await connection.query('UPDATE recommendations SET points = points - 1 WHERE id = $1 RETURNING *', [id]);
  }
  if (!result) {
    return null;
  }
  return result.rows[0];
}

async function getRandomRec({ moreThan10 }) {
  let result;
  if (moreThan10) {
    result = await connection.query('SELECT * FROM recommendations WHERE points > 10 ORDER BY RANDOM() LIMIT 1');
    return result.rows;
  }

  result = await connection.query('SELECT * FROM recommendations ORDER BY RANDOM() LIMIT 1');
  return result.rows;
}

async function getTopRec({ amount }) {
  const result = await connection.query('SELECT * FROM recommendations ORDER BY points DESC LIMIT $1', [amount]);
  return result.rows;
}

export {
  createRecommendation,
  checkForExistentRec,
  addPoint,
  dropPoint,
  getRandomRec,
  getTopRec,
  chekcForExistentRecByName,
};
