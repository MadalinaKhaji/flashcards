const axios = require('axios').default;

const baseURL = 'http://localhost:3000/api/users';

describe('Users API', function () {
  let testToken;
  let testId;

  it('should post user with valid body params', function (done) {
    axios
      .post(baseURL, {
        firstName: 'Test',
        lastName: 'Test',
        username: 'test',
        email: 'test6aaadff87@email.com',
        password: 'test123',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        testId = response.data.data.insertId;
        done();
      });
  });

  it('should login user with valid email and password', function (done) {
    axios
      .post('http://localhost:3000/api/users/login', { email: 'john@email.com', password: 'pass123' })
      .then((response) => {
        expect(response.status).toBe(200);
        // saving token for further testing purposes
        testToken = response.data.token;
        console.log(testToken);
        done();
      });
  });

  it('should get user with valid id and valid token', function (done) {
    axios.get(`${baseURL}/${testId}`, { headers: { Authorization: `Bearer ${testToken}` } }).then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it('should get users with valid token', function (done) {
    axios.get(baseURL, { headers: { Authorization: `Bearer ${testToken}` } }).then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it('should update user with valid id and valid token', function (done) {
    axios
      .patch(
        baseURL,
        { firstName: 'Test1', lastName: 'Test', username: 'username1', email: 'tesfffffddsdt@email.com', id: testId },
        { headers: { Authorization: `Bearer ${testToken}` } }
      )
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it('should delete user with valid id and valid token', function (done) {
    axios.delete(`${baseURL}/${testId}`, { headers: { Authorization: `Bearer ${testToken}` } }).then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });
});
