import {convertCentIntoPrice} from '../script/utils/price.js'

// if(typeof describe === 'function') {
//   describe('convertCentIntoPrice', () => {
//     it('should convert cents to dollars correctly', () => {
//       expect(convertCentIntoPrice(100)).toBe('$1.00');
//       expect(convertCentIntoPrice(2500)).toBe('$25.00');
//       expect(convertCentIntoPrice(9999)).toBe('$99.99');
//       expect(convertCentIntoPrice(0)).toBe('$0.00');
//     });

//     it('should handle negative values', () => {
//       expect(convertCentIntoPrice(-100)).toBe('-$1.00');
//       expect(convertCentIntoPrice(-2500)).toBe('-$25.00');
//     });
//   });
// }

if(convertCentIntoPrice(2000.1) === '20.00'){
    console.log('Passed: convertCentIntoPrice(2000.1) returns 20.00');
}else{
    console.log('Failed: convertCentIntoPrice(2000.1) does not return 20.00');
}

if(convertCentIntoPrice(0) === '0.00'){
    console.log('Passed: convertCentIntoPrice(0) returns 0.00');
}
else{
    console.log('Failed: convertCentIntoPrice(0) does not return 0.00');
}