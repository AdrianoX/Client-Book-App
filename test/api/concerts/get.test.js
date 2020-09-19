const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {
        const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg', tickets: 40  });
        await testConOne.save();

        const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 1, image: '/img/uploads/2f342s4fsdg.jpg', tickets: 45  });
        await testConTwo.save();
    });

    it('/:performer/:performer should return performers by name ', async () => {
        const res = await request(server).get('/api/concerts/performer/Rebekah Parker');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('/:genre/:genre should return performers by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('/:price/:price should return performers by price  ', async () => {
        const res = await request(server).get('/api/concerts/price/25/35');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:day/:day should return performers by day  ', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    after(async () => {
        await Concert.deleteMany();
    });


}); 