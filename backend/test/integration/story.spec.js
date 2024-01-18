const request = require('supertest');
const app = require('../../app');
const prisma = require('../../libs/prisma');

describe('Story Endpoint API', () => {
  beforeAll(async () => {
    await prisma.story.deleteMany()
  });

  it('should can create story', async () => {
    const response = await request(app)
      .post('/api/v1/stories')
      .send({
        title: 'title',
        synopsis: 'synopsis',
        status: 'Published',
        writer: 'writer',
        category: 'Health',
        tags: ['Best', 'Short'],
        chapters: [
          {
            title: 'title',
            content: 'body',
          },
        ],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Story created successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('should can retrive stories', async () => {
    const response = await request(app).get('/api/v1/stories');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Stories retrieved successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should can retrive story by id', async () => {
    const response = await request(app).get('/api/v1/stories/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Story retrieved successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('should can update story', async () => {
    const response = await request(app)
      .put('/api/v1/stories/1')
      .send({
        title: 'title updated',
        synopsis: 'synopsis',
        status: 'Published',
        writer: 'writer',
        category: 'Health',
        tags: ['Best', 'Short'],
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Story updated successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('should can delete story', async () => {
    const response = await request(app).delete('/api/v1/stories/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Story deleted successfully');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Object);
  });
});
