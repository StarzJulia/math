import { roundNum } from "./calculations";

function getSubMatrix(m: number[][], i: number, j: number): number[][] {
    return m.reduce(function(subm: number[][], val, index) {
        if (index != i) {
            subm.push(val.filter((_v, ind) => ind != j));
        }
        return subm;
    }, []);
}

export function calcDeterminant(m: number[][]): number {
    if (m.length == 1) {
        return m[0];
    }
    
    let res = 0;

    for (let i = 0; i < m.length; i++) {
        let ans: number = m[0][i];  
        let m1 = getSubMatrix(m, 0, i);

        ans *= calcDeterminant(m1);

        if (i % 2 == 0) {
            res += ans;
        } else {
            res -= ans;
        }
    }

    return res
}

export function transposeMatrix(m: number[][]) {
    return new Array(m[0].length).fill(new Array(m.length).fill(1)).map((v: number[], i: number) => {
        return v.map((_v1: number, j: number) => m[j][i]);
    });
}

function adjugateMatrix(m: number[][]): number[][] {
    let c = new Array(m[0].length).fill(new Array(m.length).fill(1)).map((v: number[], i: number) => {
        return v.map((_v1: number, j: number) => ((i + j) % 2 == 0 ? 1 : -1));
    });
    
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            let det = calcDeterminant(getSubMatrix(m, j, i));
            c[i][j] *= det;
        }
    }

    return c;
}

export function inverseMatrix(m: number[][]): number[][] {
    const d: number = calcDeterminant(m);
    let adj: number[][] = adjugateMatrix(m);

    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            adj[i][j] = roundNum(adj[i][j] / d);
        }
    }

    return adj;
}

export function calcMinorMatrix(m: number[][]): number[][] {
    let minor: number[][] = [];

    for (let i = 0; i < m.length; i++) {
        let row = [];
        for (let j = 0; j < m[0].length; j++) {
            let m1 = getSubMatrix(m, j, i);
            row.push(calcDeterminant(m1));
        }
        minor.push(row);
    }

    return minor;
}

export function findMatrixMax(m: number[][], i: number, j: number, f: string = ''): number {
    let r = i;
    let c = j;
    
    while (r < m.length && m[r][j] == 0) {
        r += 1;
    }

    if (r == m.length) {
        return 0;
    }

    if (f == 'max-col') {
        for (let n = r + 1; n < m.length; n++) {
            if (Math.abs(m[r][j]) < Math.abs(m[n][j])) {
                r = n;
            }
        }
    }
    if (f == 'max-matrix') {
        for (let n = i; n < m.length; n++) {
            for (let k = j; k < m[0].length; k++) {
                if (Math.abs(m[r][c]) < Math.abs(m[n][k])) {
                    r = n;
                    c = k;
                }
            }
        }
    }

    if (c == m[0].length) {
        return 0;
    }

    if (f == 'max-matrix' && c > j) {
        for (let n = 0; n < m.length; n++) {
            [m[n][c], m[n][j]] = [m[n][j], m[n][c]];
        }
    }
    if (r > i) {
        for (let k = j; k < m[0].length; k++) {
            [m[r][k], m[i][k]] = [m[i][k], m[r][k]];
        }
    }

    return m[i][j];
}

export function calcBareiss(m: number[][], i: number = 0, findMax: string = ''): number[][] | boolean {
    if (m.length > m[0].length && m[0].length == i) {
        for (let j = 0; j < m[0].length; j++) {
            m[i][j] = 0;
        }
        while (m.length > i + 1) {
            m.pop();
        }
        return m;
    } else if (i + 1 == m.length) {
        for (let j = 0; j < i; j++) {
            m[i][j] = 0;
        }
        return m;
    }

    let pivot = findMatrixMax(m, i, i, findMax);

    if (!pivot) {
        return false;
    }

    for (let j = 0; j < i; j++) {
        m[i][j] = 0;
    }

    for (let j = i + 1; j < m.length; j++) {
        for (let k = i + 1; k < m[0].length; k++) {
            let div = (i == 0) ? 1 : m[i - 1][i - 1];
            m[j][k] = (pivot * m[j][k] -  m[j][i] * m[i][k]) / div;
        }
    }

    calcBareiss(m, i + 1, findMax);

    return m;
}

export function calcGauss(m: number[][], i: number = 0, findMax: string = ''): number[][] | boolean {
    if (m.length > m[0].length && m[0].length == i) {
        for (let j = 0; j < m[0].length; j++) {
            m[i][j] = 0;
        }
        while (m.length > i + 1) {
            m.pop();
        }
        return m;
    } else if (i + 1 == m.length) {
        return m;
    }

    let pivot = findMatrixMax(m, i, i, findMax);

    if (pivot == 0) {
        return false;
    }

    for (let j = i + 1; j < m.length; j++) {
        let el = m[j][i];
        m[j][i] = 0;
        for (let k = i + 1; k < m[0].length; k++) {
            m[j][k] = (m[j][k] - (m[i][k] / pivot) * el);
        }
    }

    calcGauss(m, i + 1, findMax);

    return m;
}

export function calcDeterminantGauss(m: number[][]): number {
    let d = 1;

    for (let i = 0; i < Math.min(m[0].length, m.length); i++) {
        d *= m[i][i];
    }

    return d;
}

export function calcRank(m: number[][]): number {
    let EPS: number = Math.pow(10, -9);
    let r: number = 0;
    let selected: boolean[] = new Array(m[0].length).fill(false);
    
    for (let i = 0; i < m[0].length; i++) {
        let index = -1;
        for (let j = 0; j < m.length; j++) {
            if (!selected[j] && Math.abs(m[j][i]) > EPS) {
                index = j;
                break;
            }
        }

        if (index != m.length) {
            ++r;
            selected[index] = true;

            for (let p = i + 1; p < m[0].length; p++) {
                m[index][p] /= m[index][i];
            }

            for (let k = 0; k < m.length ; k ++) {
                if (k != index && Math.abs(m[k][i]) > EPS) {
                    for (let p = i + 1; p < m[0].length; p++) {
                        m[k][p] -= m[index][p] * m[k][i];
                    }
                }
            }
        }
    }

    return r;
}

export function calcEchelonForm(m: number[][], i: number = 0, j: number = 0): number[][] {
    if (i == m.length || j == m[0].length) {
        return m;
    }

    let col: number = j;
    let pivot = findMatrixMax(m, i, col);

    while (col < m[0].length && !pivot) {
        col += 1;
        pivot = findMatrixMax(m, i, col);
    }

    if (pivot && pivot != 0) {
        for (let c = j; c < m[0].length; c++) {
            m[i][c] /= pivot;
        }
        
        for (let r = i + 1; r < m.length; r++) {
            let el = m[r][j];
            for (let c = j; c < m[0].length; c++) {
                m[r][c] -= el * m[i][c];
            }
        }
    }

    calcEchelonForm(m, i + 1, j + 1);

    return m;
}

export function calcRowEchelonForm(m: number[][]): number[][] {
    for (let i = 0; i < m.length; i++) {
        let j = i;

        while (j < m[0].length && m[i][j] != 1) {
            j += 1;
        }

        if (j == m[0].length) {
            continue;
        }
        
        for (let r = 0; r < m.length; r++) {
            if (r != i && m[r][j] != 0) {
                let el = m[r][j];
                for (let c = 0; c < m[0].length; c++) {
                    m[r][c] -= el * m[i][c];
                }
            }
        }
    }

    return m;
}

export function roundMatrixValues(m: number[][]): number[][] {
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            m[i][j] = Math.floor(m[i][j] * 100) / 100;
        }
    }
    return m;
}