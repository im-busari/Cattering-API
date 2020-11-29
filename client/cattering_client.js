const fs = require('fs');
let config = require('./config.json');
let argv = require('minimist')(process.argv.slice(2));
const CatApi = require('./CatApi');
let myArgs = process.argv.slice(2);

const api = new CatApi({
  api_url: config.api_url,
});

function updateConfigFile(cat, key) {
  let data = {
    api_url: config.api_url,
    cat: cat,
    key: key,
  };
  const jsonString = JSON.stringify(data);
  fs.writeFile('./config.json', jsonString, (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully updated config file.');
    }
  });
}

/*
REGISTER cat: $ node cattering_client.js --register --cat=Shusia
GET all meows: $ node cattering_client.js --getall
GET my meows: $ node cattering_client.js --getself
CREATE new meow: $ node cattering_client.js --create --message="Why do the humans get mad when I wake them up?"
DELETE a meow: $ node cattering_client.js --delete --meowid=12
 */

switch (myArgs[0]) {
  case '--register':
    if (argv['cat']) {
      api
        .createCat({ cat: argv['cat'] })
        .then((res) => {
          //  console.log(res.headers.get('key'));
          if (res.status === 201) {
            updateConfigFile(argv['cat'], res.headers.get('key'));
          } else {
            console.log("Cat already exists.")
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('Please try to provide --cat');
    }
    break;
  case '--getall':
    api
      .getAllMeows()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.table(data);
      });
    break;
  case '--getself':
    if (!config.cat) return console.log('Please create a cat first...');
    api
      .getSelfMeows(config.cat, config.key)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.table(data);
      })
      .catch((err) => {
        console.error(err);
      });
    break;
  case '--create':
    if (!config.cat) return console.log('Please create a cat first...');

    if (argv['message']) {
      api
        .createMeow({ text: argv['message'] }, config.cat, config.key)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.table(data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('Please provide message...');
    }
    break;
  case '--delete':
    if (!config.cat) return console.log('Please create a cat first...');

    if (argv['meowid']) {
      api
        .deleteMeow({ id: argv['meowid'] }, config.cat, config.key)
        .then((res) => {
          if (res.status === 200) {
            console.log("Meow deleted successfully.")
          } else {
            console.log("You don't have a meow with the given ID.")
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('Please provide message...');
    }
    break;

  default:
    console.log('Sorry, this is not something I know how to do.');
}
