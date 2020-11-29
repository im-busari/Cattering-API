let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;
const fs = require('fs');
chai.use(chaiHttp);


describe('Cattering_API', () => {
  before(() => {
    let cats = JSON.stringify([
      { id: 1, cat: 'Dilan', meows: 0, key: '_1zthqh9zxz' },
      { id: 2, cat: 'John', meows: 0, key: '_2zthqh9zxz' },
    ]);
    let meows = JSON.stringify([
      {
        id: 1,
        createdBy: 'Dilan',
        text: 'RandomMessage',
        createdAt: '3-09-2020 03:14',
      },
      {
        id: 2,
        createdBy: 'Dilan',
        text: '2ndMessage',
        createdAt: '3-09-2020 03:14',
      },
      {
        id: 3,
        createdBy: 'John',
        text: 'RandomMessage',
        createdAt: '3-09-2020 03:14',
      },
    ]);
    fs.writeFile('cats.json', cats, (err) => {
      if (err) throw err;
    });
    fs.writeFile('meows.json', meows, (err) => {
      if (err) throw err;
    });
  });

  it('should GET all cats in cats.json', (done) => {
    chai
      .request(server)
      .get('/cats')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        done();
      });
  });

  it('should GET all meows in meows.json', (done) => {
      chai
        .request(server)
        .get('/meows')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });

  it('should GET meow by ID', (done) => {
      chai
        .request(server)
        .get('/meows/3')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });

  it('should return 404 - meow doesnt exist', (done) => {
    chai
      .request(server)
      .get('/meows/23')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
  });

  //
  it('should GET only my meows', (done) => {
    chai
      .request(server)
      .get('/my_meows/Dilan/_1zthqh9zxz')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      })
  });

  it('should create new cat and add it to cats.json', (done) => {
    chai
      .request(server)
      .post('/register')
      .send({ cat: 'Dsda' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      })
  });

  it('should return 409 since cat exists', (done) => {
    chai
      .request(server)
      .post('/register')
      .send({ cat: 'John' })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done()
      })
  });


  it('should create new meow and add it to meow.json', (done) => {
    chai
      .request(server)
      .post('/meows/John/_2zthqh9zxz')
      .send({ text: 'John Meows Meows' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should delete meow from meows.json',  (done) => {

    chai
      .request(server)
      .delete('/meows/2/Dilan/_1zthqh9zxz')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done()
      })
  })

  it('should fail to delete meow since it does not belong to Dilan', (done) => {
    chai
      .request(server)
      .delete('/meows/3/Dilan/_1zthqh9zxz')
      .end((err, res) => {
        expect(res).to.have.status(403);
        done()
      });
  });

});
