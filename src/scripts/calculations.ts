export function gcdF(n1: number, n2: number): number {
    return n1 == 0 ? n2 : gcdF(n2 % n1, n1);
}

export function lcmF(n1: number, n2: number): number {
    return (n1 * n2) / gcdF(n1, n2);
}