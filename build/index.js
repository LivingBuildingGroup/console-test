'use strict';

var _require = require('conjunction-junction'),
    isObjectLiteral = _require.isObjectLiteral;

var deepEqual = require('deep-equal');
var logger = require('./logger').createLogger('./logs/test.log', 'no-header');

var describe = function describe(string, fn) {
  undefined.describeString = string;
  fn();
};

var it = function it(string, fn) {
  undefined.itString = string;
  fn();
};

var expect = function expect(actual) {
  var logObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  // logger.info('this.describeString',this.describeString)
  // logger.info('this.itString',this.itString)
  return {
    to: {
      equal: function equal(expected) {
        if (actual !== expected) {
          logger.warn('\nFAIL > > : "' + undefined.describeString + ' / ' + undefined.itString + '", \n        actual: ' + actual + ' does not equal \n        expected: ' + expected);
          return false;
        }
        logger.info('        OK (shlw) "' + undefined.describeString + ' / ' + undefined.itString + '"');
        return true;
      },
      deep: {
        equal: function equal(expected) {
          if (actual === expected) {
            logger.info('        OK (shlw) "' + undefined.describeString + ' / ' + undefined.itString + '"');
            return true;
          }
          if (deepEqual(actual, expected)) {
            logger.info('        OK (deep) "' + undefined.describeString + ' / ' + undefined.itString + '"');
            return true;
          }
          // fail
          logger.warn('\n....FAIL: "' + undefined.describeString + ' / ' + undefined.itString + '"');
          var logIt = isObjectLiteral(actual) && logObjects || isObjectLiteral(expected) && logObjects || Array.isArray(actual) && logObjects || Array.isArray(expected) && logObjects || actual === null || expected === null || actual === undefined || expected === undefined;
          if (logIt) {
            logger.warn('....ACTUAL:\n', actual);
            logger.warn('....EXPECTED:\n', expected);
          } else {
            logger.warn('....actual: ' + actual + ' does not deep equal \n....expected: ' + expected);
          }
          return false;
        }
      }
    }
  };
};

module.exports = {
  describe: describe,
  it: it,
  expect: expect,
  testLog: logger
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