import request from 'supertest';
import app from '../app'; // Replace with the actual path to your Express app

describe('Betting Services System Tests', () => {
  let createdBettingId: string;

  it('should create a new betting via API', async () => {
    const bettingData = {
      userId: 'user123',
      characterName: 'TestCharacter',
      region: 'TestRegion',
      realm: 'TestRealm',
      amount: 100,
    };

    const response = await request(app)
      .post('/bettings') // Assuming this is the route for creating a betting
      .send(bettingData)
      .expect(201); // Expecting a 201 Created status code

    // Store the created betting ID for subsequent tests
    createdBettingId = response.body._id;

    // Add assertions to validate the response body, if needed
    expect(response.body).toHaveProperty('_id');
    expect(response.body.userId).toBe(bettingData.userId);
    // Add more assertions as necessary
  });

  it('should get a betting by ID via API', async () => {
    const response = await request(app)
      .get(`/bettings/${createdBettingId}`) // Assuming this is the route for getting a betting by ID
      .expect(200); // Expecting a 200 OK status code

    // Add assertions to validate the response body, if needed
    expect(response.body._id).toBe(createdBettingId);
    // Add more assertions as necessary
  });

  it('should get all bettings via API', async () => {
    const response = await request(app)
      .get('/bettings') // Assuming this is the route for getting all bettings
      .expect(200); // Expecting a 200 OK status code

    // Add assertions to validate the response body, if needed
    // Add more assertions as necessary
  });

  it('should delete a betting by ID via API', async () => {
    await request(app)
      .delete(`/bettings/${createdBettingId}`) // Assuming this is the route for deleting a betting by ID
      .expect(200); // Expecting a 200 OK status code
  });
});
