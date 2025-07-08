import {convertCentIntoPrice} from '../../script/utils/price.js';


describe('test suits: convertCentIntoPrice', () => { 
it('convert cents into dollars', () =>{
    expect(convertCentIntoPrice(2025)).toEqual('20.25')
    expect(convertCentIntoPrice(0)).toEqual('0.00')
    expect(convertCentIntoPrice(100)).toEqual('1.00')
    expect(convertCentIntoPrice(2500)).toEqual('25.00')
    expect(convertCentIntoPrice(9999)).toEqual('99.99')
});
  it('should handle negative values', () => {
    expect(convertCentIntoPrice(-100)).toEqual('-1.00')
    expect(convertCentIntoPrice(-2500)).toEqual('-25.00')
    expect(convertCentIntoPrice(-9999)).toEqual('-99.99')
    expect(convertCentIntoPrice(-1010)).toEqual('-10.10')
  });
  it('should handle zero', () =>{
    expect(convertCentIntoPrice(0)).toEqual('0.00')
  });

  it('should round a nearest cent', () =>{
    expect(convertCentIntoPrice(2000.1)).toEqual('20.00')
    expect(convertCentIntoPrice(2000.9)).toEqual('20.01')
    expect(convertCentIntoPrice(2000.499)).toEqual('20.00')
  })
});

