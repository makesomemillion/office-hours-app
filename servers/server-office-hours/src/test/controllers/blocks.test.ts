import app from '../../app';
import {expect} from 'chai';
import request = require('supertest');

describe('GET /blocks', () => {
  it('should return an array of blocks', done => {
    request(app)
        .get('/blocks')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          res.body.forEach(item => {
            expect(item).to.include.keys('start', 'duration', 'meetingDuration');
          });
          done();
        });
  });
});
