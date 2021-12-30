import * as matrixFunctions from '../scripts/matrices';

test('det([[1,2,3],[4,5,6],[7,8,9]]) should be 0', () => {
    expect(matrixFunctions.calcDeterminant([[1,2,3],[4,5,6],[7,8,9]])).toBe(0);
});

test('det([[3,8],[4,6]]) should be -14', () => {
    expect(matrixFunctions.calcDeterminant([[3,8],[4,6]])).toBe(-14);
});

test('det([[3,7],[1,-4]]) should be -19', () => {
    expect(matrixFunctions.calcDeterminant([[3,7],[1,-4]])).toBe(-19);
});

test('transposed [[1,2]] should be [[1],[2]]', () => {
    expect(matrixFunctions.transposeMatrix([[1,2]])).toStrictEqual([[1],[2]]);
});

test('transposed [[1,2],[3,4],[5,6]] should be [[1,3,5],[2,4,6]]', () => {
    expect(matrixFunctions.transposeMatrix([[1,2],[3,4],[5,6]])).toStrictEqual([[1,3,5],[2,4,6]]);
});

test('inversed [[3,3.2],[3.5,3.6]] should be [[-9,8],[8.75,-7.5]]', () => {
    expect(matrixFunctions.inverseMatrix([[3,3.2],[3.5,3.6]])).toStrictEqual([[-9,8],[8.75,-7.5]]);
});