import pug from 'pug';
import chaiHttp from 'chai-http';
import chai from 'chai';
import sinon from 'sinon';
import server from '../../../server';

chai.use(chaiHttp);
chai.should();

describe.skip('request to all(*) routes', () => {
  it('renders the pug file', (done) => {
    const spy = sinon.spy(pug, '__express');
    chai.request(server)
      .get('/')
      .end((err) => {
        if (err) return done(err);
        spy.calledWithMatch(/\/index\.pug$/).should.be.true;
        spy.restore();
        done();
      });
  });
});
