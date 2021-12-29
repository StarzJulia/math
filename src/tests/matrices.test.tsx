import {calcDeterminant} from '../scripts/matrices';

test('det([[1,2,3],[4,5,6],[7,8,9]]) should be 0', () => {
    expect(calcDeterminant([[1,2,3],[4,5,6],[7,8,9]])).toBe(0);
});
