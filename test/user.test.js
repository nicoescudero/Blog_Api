/*
const request = require('supertest');
const { expect } = require('chai');
const User = require('../models/user');

const app = require('../app');

const data = {
  email: 'user@example.com',
  password: 'mypassword'
}

beforeEach(async () => {
  const user = new User({email: data.email, password: await User.encrypt(data.password)});
  await user.save();
});
after(async() => {
  await User.deleteMany({});
})

describe('POST /auth/login', () => {
  it('POST Auth Login [SUCCESS] - STATUS 200OK', async () => {
    const res = await request(app).post('/auth/login').send(data);
    expect('Content-Type', /application\/json/);
    expect(res.body.code).to.be.a('number').equal(200);
    expect(res.body.status).to.be.a('boolean').equal(true);
    expect(res.body.body).to.be.a('object');
    expect(res.body.body).to.have.property('token');
  })
  it('Unauthorized User STATUS 401', async () => {
    const res = await request(app).post('/auth/login').send({email: data.email, password: 'OtherPassword'});
    expect('Content-Type', /application\/json/);
    expect(res.statusCode).to.be.a('number').equal(401);
  });
  it('User Not Found STATUS 404', async () => {
    const res = await request(app).post('/auth/login').send({email: 'otherUser@exmaple.com', password:'myPassword'});
    console.log(res.statusCode);
    expect('Content-Type', /application\/json/);
    expect(res.statusCode).to.be.a('number').equal(404);
  });
})
*/
