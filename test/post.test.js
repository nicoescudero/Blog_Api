const request = require('supertest');
const Post = require('../models/post');
const User = require('../models/user');
const { expect } = require('chai');

const app = require('../app');

const data = {
  email: 'user@example.com',
  password: 'mypassword'
}

before(async () => {
  const user = new User({email: data.email, password: await User.encrypt(data.password)});
  await user.save();
});

after(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
})

describe('POST /posts', () => {
  let token;

  before(async () => {
    const { body} = await request(app).post('/auth/login')
    .set('Accept', 'application/json')  
    .send({email: 'user@example.com',password: 'mypassword'})
    .expect('Content-Type', /json/);
    token = body.body.token;
  });

  it('POST STATUS: 201 Create Post',async () => {
    const { body } = await request(app).post('/posts')
    .send({
      title:'My Post',
      image: 'https://images.com/photo.png',
      body: ' ### My Post'
    })
    .set('Authorization', 'Bearer ' + token)
    .set("Accept", "text/html; charset=utf-8")
    .expect("Content-Type", /json/)
    .expect(201);
    const { code, status, message, body: resBody } = body;
    expect(code).to.be.a('number');
    expect(code).to.equal(201);
    expect(status).to.be.true;
    expect(message).to.be.a('string');
    expect(resBody).to.be.an('object');
  });

  it('POST STATUS: 401 Unauthorized',async () => {
    const error = await request(app).post('/posts')
    .send({ title:'My Post' })
    .set('Authorization', token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /json/)
    .expect(401);
    expect(error).to.be.an('object');
  });
});

describe('PUT /posts/:id', async () => {
  let token, postID;
  const data={
    title:'My Post Updated',
    image: 'https://images.com/photoUpdate.png',
    body: ' ### My Post Updated'
  };
  before(async () => {
    const { body } = await request(app).post('/auth/login')
    .set('Accept', 'application/json')
    .send({
      email: 'user@example.com',
      password: 'mypassword'
    })
    .expect('Content-Type', /json/);
    const { body:bodyRes } = body;
    token = bodyRes.token;
    const post = await Post.findOne({ title: 'My Post'});
    postID = post._id;
  });

  it('Update Post STATUS: 200OK',async () => {
    const { body } = await request(app).put(`/posts/${postID}`)
    .send(data)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect("Content-Type", /json/)
    .expect(200);
    const { code, status } = body;
    expect(code).to.be.a('number');
    expect(code).to.equal(200);
    expect(status).to.be.true;
  })
  
  it('PUT STATUS: 404 Post not found',async () => {
    const { error } = await request(app).put(`/posts/62ffb58fa39558560d1f5486`)
    .send(data)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /text\/html/)
    .expect(404)
    const { status } = error
    expect(status).to.be.a('number')
    expect(status).to.equal(404)
  })
  it('PUT STATUS: 401 Error Updating Post',async () => {
    const { error } = await request(app).put(`/posts/${postID}`)
    .send({
      title: 'Post updated',
    })
    .set('Authorization', token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /json/)
    .expect(401);
    const { status, message } = error;
    expect(status).to.be.a('number');
    expect(status).to.equal(401);
    expect(message).to.be.a('string');
  });
});

describe('Get post by ID /posts/id', async () => {
  let token, postID;
  before(async () => {
    const { body } = await request(app).post('/auth/login')
    .set('Accept', 'application/json')
    .send({
      email: 'user@example.com',
      password: 'mypassword'
    })
    .expect('Content-Type', /json/);
    const { body:bodyRes } = body;
    token = bodyRes.token;
    const post = await Post.findOne({ title: 'My Post Updated'});
    postID = post._id;
  });
  it('GET Post STATUS: 200OK', async () => {
    const { body } = await request(app).get(`/posts/${postID}`)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect("Content-Type", /json/)
    .expect(200);
    const { code, status } = body;
    expect(code).to.be.a('number');
    expect(code).to.equal(200);
    expect(status).to.be.true;
  });
  it('POST Not Found STATUS: 404', async () => {
    const { error } = await request(app).get(`/posts/62ffb58fa39558560d1f5486`)
    .set('Authorization', 'Bearer ' + token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /text\/html/)
    .expect(404)
    const { status } = error
    expect(status).to.be.a('number')
    expect(status).to.equal(404)
  });
  it('Unauthorized STATUS: 401', async () => {
    const { error } = await request(app).get(`/posts/${postID}`)
    .set('Authorization', token)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /json/)
    .expect(401);
    const { status, message } = error;
    expect(status).to.be.a('number');
    expect(status).to.equal(401);
    expect(message).to.be.a('string');
  });
});

describe('Get All Posts /posts/all', async () => {
  it('Get All Posts STATUS 200OK', async () => {
    const { body } = await request(app).get(`/posts/all`)
    .set('Accept', 'text/html; charset=utf-8')
    .expect("Content-Type", /json/)
    .expect(200);
    const { code, status } = body;
    expect(code).to.be.a('number');
    expect(code).to.equal(200);
    expect(status).to.be.true;
  });
  it('Posts not found STATUS: 404', async () => {
    await await Post.deleteMany({});
    const { error } = await request(app).get(`/posts/all`)
    .set('Accept', 'text/html; charset=utf-8')
    .expect('Content-Type', /text\/html/)
    .expect(404)
    const { status } = error
    expect(status).to.be.a('number')
    expect(status).to.equal(404)
  })
});