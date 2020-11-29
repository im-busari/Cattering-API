const url = require('url');
const Meow = require('../controllers/MeowController');

module.exports.delete = (req, res) => {
  const { pathname } = url.parse(req.url);
  const id = parseInt(pathname.split('/')[2]); // MUST get ID from config.json
  const cat = pathname.split('/')[3];
  const key = pathname.split('/')[4];

  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  switch (pathname) {
    case `/meows/${id}/${cat}/${key}`:
      const result = Meow.deleteMeow(id, cat, key);

      switch (result) {
        case 200:
          res.statusCode = 200;
          res.end(
            JSON.stringify('Couldnt find meow...')
          );
          break;
        case 403:
          res.statusCode = 403;
          res.end(
            JSON.stringify('Couldnt find meow...')
          );
          break;
      }
      break;
    default:
      res.statusCode = 403;
      res.end(JSON.stringify("Can't access..."));
      break;
  }
};
