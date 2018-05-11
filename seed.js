const { db } = require('./connection');
const { beans, users } = require('./data');
const { hashSync } = require('bcrypt');

async function main() {
  const ben = await users.addUser('ben', hashSync('ben', 10));
  const phil = await users.addUser('phil', hashSync('phil', 10));
  const annie = await users.addUser('annie', hashSync('annie', 10));
  const christian = await users.addUser('christian', hashSync('christian', 10));
  const peter = await users.addUser('peter', hashSync('peter', 10));

  const lima = await beans.addBean(
    ben._id,
    'lima',
    'cool',
    'https://duckduckgo.com/i/45158a64.jpg'
  );
  const pinto = await beans.addBean(
    phil._id,
    'pinto',
    'cool',
    'https://duckduckgo.com/i/731e644d.jpg'
  );
  const kidney = await beans.addBean(
    annie._id,
    'kidney',
    'cool',
    'https://duckduckgo.com/i/21314ece.jpg'
  );

  await beans.addComment(lima._id, lima.title, phil._id, 'this is great!', 5);
  await beans.addComment(pinto._id, pinto.title, kidney._id, 'this sucks!', 1);
}

db
  .then(main)
  .catch(err => console.error(err))
  .then(() => db)
  .then(x => x.close());
