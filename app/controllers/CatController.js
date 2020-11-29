const fs = require('fs');

const getCats = (id) => {
  let cats = fs.readFileSync('cats.json', 'utf8');
  cats = JSON.parse(cats);
  if (typeof id === 'number') {
    for (let i = 0; i < cats.length; i++) {
      if (cats[i].id === id) {
        return cats[i];
      }
    }
    return 404;
  } else {
    return cats;
  }
};

const storeCats = (cat) => {
  let cats = getCats();
  cat.id = cats.length + 1;
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].cat === cat.cat) {
      return 409;
    }
  }
  const key = '_' + cat.id + Math.random().toString(36).substr(2, 9);
  cat.key = key;

  //  Append to file
  cats.push({ id: cat.id, cat: cat.cat, meows: 0, key: cat.key });
  cats = JSON.stringify(cats);

  fs.writeFile('cats.json', cats, (err) => {
    if (err) throw err;
    console.log('Your cat joined the club!');
  });

  //  TODO: REMOVE console.log(key);
  return key;
};

const CatsController = function () {};
CatsController.prototype.getCats = getCats;
CatsController.prototype.storeCats = storeCats;

module.exports = new CatsController();
