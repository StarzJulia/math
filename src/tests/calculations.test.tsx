import * as calculations from '../scripts/calculations';

test('GCD of 150 and 180 should be 30', () => {
    expect(calculations.gcdF(150, 180)).toBe(30);
});

test('test gcd(12, 43) = 1', () => {
    expect(calculations.gcdF(12, 43)).toBe(1);
});

test('test lcm(8, 12) = 24', () => {
  expect(calculations.lcmF(8, 12)).toBe(24);
});

test('test lcm(4, 34) = 68', () => {
  expect(calculations.lcmF(4, 34)).toBe(68);
});

test('test log(10, 10) = 1', () => {
  expect(calculations.logF(10, 10)).toBe(1);
});

test('test log(64, 2) = 6', () => {
  expect(calculations.logF(64, 2)).toBe(6);
});

test('test 5! = 120', () => {
  expect(calculations.factorialF(5)).toBe(120);
});

test('test 0! = 1', () => {
  expect(calculations.factorialF(0)).toBe(1);
});

test('test round(64.345) = 64.35', () => {
  expect(calculations.roundNum(64.345)).toBe(64.35);
});

test('test round(64.345, 0) = 64', () => {
  expect(calculations.roundNum(64.345, 0)).toBe(64);
});
