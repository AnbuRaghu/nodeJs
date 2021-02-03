const assert=require('chai').assert;
var numbers=[1,2,3,4,5]
assert.isArray(numbers,'is an array of numbers')
assert.include(numbers,8,'8 is included')