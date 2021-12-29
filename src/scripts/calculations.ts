const factArr = [1, 1, 2];

export function factorialF(n: number) {
    if (!factArr[n]) {
        factArr[n] = n * factorialF(n - 1);
    }
    return factArr[n];
}

export function gcdF(n1: number, n2: number): number {
    return n1 == 0 ? n2 : gcdF(n2 % n1, n1);
}

export function lcmF(n1: number, n2: number): number {
    return (n1 * n2) / gcdF(n1, n2);
}

export function logF(n: number, base: number): number {
    return Math.log(n) / Math.log(base);
}

export function roundNum(n: number, q: number = 2): number {
    return Math.round(n * Math.pow(10, q)) / Math.pow(10, q);
}