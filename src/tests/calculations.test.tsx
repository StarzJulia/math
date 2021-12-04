import {gcdF, lcmF, logF, roundNum, factorialF} from '../scripts/calculations';

test('test gcd(150, 180) = 30', () => {
    expect(gcdF(150, 180)).toBe(30);
});

test('test gcd(12, 43) = 1', () => {
    expect(gcdF(12, 43)).toBe(1);
});

test('test lcm(8, 12) = 24', () => {
  expect(lcmF(8, 12)).toBe(24);
});

test('test lcm(4, 34) = 68', () => {
  expect(lcmF(4, 34)).toBe(68);
});

test('test log(10, 10) = 1', () => {
  expect(logF(10, 10)).toBe(1);
});

test('test log(64, 2) = 6', () => {
  expect(logF(64, 2)).toBe(6);
});

test('test 5! = 120', () => {
  expect(factorialF(5)).toBe(120);
});

test('test 0! = 1', () => {
  expect(factorialF(0)).toBe(1);
});

test('test round(64.345) = 6', () => {
  expect(roundNum(64.345)).toBe(64.34);
});
