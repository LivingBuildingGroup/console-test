'use strict';
const { isObjectLiteral } = require('conjunction-junction');
const deepEqual = require('deep-equal');
const logger = require('./logger').createLogger('./logs/test.log', 'no-header');

const describe = (string, fn) => {
  this.describeString = string;
  fn();
};

const it = (string, fn) => {
  this.itString = string;
  fn();
};

const expect = (actual, logObjects=true) => {
  // logger.info('this.describeString',this.describeString)
  // logger.info('this.itString',this.itString)
  return {
    to: {
      equal: expected => {
        if(actual !== expected) {
          logger.warn(`\nFAIL > > : "${this.describeString} / ${this.itString}", \n        actual: ${actual} does not equal \n        expected: ${expected}`);
          return false;
        }
        logger.info(`        OK (shlw) "${this.describeString} / ${this.itString}"`);
        return true;
      },
      deep: {
        equal: expected => {
          if(actual === expected) {
            logger.info(`        OK (shlw) "${this.describeString} / ${this.itString}"`);
            return true;
          }
          if(deepEqual(actual, expected)){
            logger.info(`        OK (deep) "${this.describeString} / ${this.itString}"`);
            return true;
          }
          // fail
          logger.warn(`\n....FAIL: "${this.describeString} / ${this.itString}"`);
          const logIt =  
            isObjectLiteral(actual) && logObjects ||
            isObjectLiteral(expected) && logObjects ||
            Array.isArray(actual) && logObjects ||
            Array.isArray(expected) && logObjects ||
            actual === null || 
            expected === null ||
            actual === undefined || 
            expected === undefined;
          if(logIt){
            logger.warn('....ACTUAL:\n', actual);
            logger.warn('....EXPECTED:\n', expected);
          } else {
            logger.warn(`....actual: ${actual} does not deep equal \n....expected: ${expected}`);
          }
          return false;
        }
      }
    }
  };
};

module.exports = {
  describe, 
  it,
  expect,
  testLog: logger,
};

// describe('a bunch of tests',()=>{

//   it('fruits are equal', ()=>{
//     expect('apple').to.equal('apple');
//   });

//   it('fruits are equal', ()=>{
//     expect('apple').to.equal('apples');
//   });

// });

// describe('more bunch of tests',()=>{

//   it('plants are equal', ()=>{
//     expect('tree').to.equal('bush');
//   });

//   it('cars are equal', ()=>{
//     expect('Honda').to.equal('Toyota');
//   });

// });


// describe('comparing objects',()=>{

//   const a = {
//     one: 1,
//     two: 2,
//   };
//   const b = {
//     one: 1,
//     two: 2,
//   };
//   const c = {
//     three: 3,
//     four: 88,
//   };
//   it('objects identical but not equal', ()=>{
//     expect(a).to.deep.equal(b);
//   });

//   it('objects are equal', ()=>{
//     expect(a).to.deep.equal(a);
//   });

//   it('objects are NOT equal', ()=>{
//     expect(a).to.deep.equal(c);
//   });

// });


