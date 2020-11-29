const url = require('url');
const Cats = require('../controllers/CatController');
const Meows = require('../controllers/MeowController');

module.exports.get = (req, res) => {
  const { pathname } = url.parse(req.url);
  const id = parseInt(pathname.split('/')[2]); // get ID
  const cat = pathname.split('/')[2];
  const key = pathname.split('/')[3];
  let result;

  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  switch (pathname) {
    case `/cats`:
      return res.end(JSON.stringify(Cats.getCats()));

    case `/cats/${id}`:
      result = Cats.getCats(id)
      if (result === 404) {
        res.statusCode = 404;
        return res.end(JSON.stringify("We can't find the MeoW MeoW..."));
      } else {
        return res.end(JSON.stringify(result));
      }
    case `/meows`:
      return res.end(JSON.stringify(Meows.getMeows()));
    case `/meows/${id}`:
      result = Meows.getMeows(id);
      if (result === 404) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'We can\'t find the MeoW MeoW...' }));
      } else {
        return res.end(JSON.stringify(result));
      }
    case `/my_meows/${cat}/${key}`:
      return res.end(JSON.stringify(Meows.getMyMeows(cat, key)));
    default:
      return res.end(JSON.stringify("Can't access..."));
  }
};
