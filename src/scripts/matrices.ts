export function getSubMatrix(m: number[][], i: number, j: number): number[][] {
    return m.reduce(function(subm: number[][], val, index) {
        if (index != j) {
            subm.push(val.filter((_v, ind) => ind != i));
        }
        return subm;
    }, [])
}

export function calcDeterminant(m: number[][]): number {
    if (m.length == 1) {
        return m[0];
    }
    
    var res = 0;

    for (var i = 0; i < m.length; i++) {
        var ans: number = m[0][i];  
        var m1 = getSubMatrix(m, 0, i);

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
    return Array.apply(0, new Array(m[0].length)).map((_v, i) => Array.apply(0, new Array(m.length)).map((_v, i1) => m[i1][i]));
}

export function inverseMatrix(m: number[][]): number[][] {
    var c = Array.apply(0, new Array(m.length)).map((_v, i) => Array.apply(0, new Array(m[0].length)).map((_v, j) => ((i + j) % 2 == 0 ? 1 : -1)));
    
    for (var i = 0; i < m.length; i++) {
        for (var j = 0; j < m[0].length; j++) {
            var det = calcDeterminant(getSubMatrix(m, j, i));
            c[i][j] *= det;
        }
    }

    return c;
}

export function calcMinorMatrix(m: number[][]): number[][] {
    var minor: number[][] = [];

    for (var i = 0; i < m.length; i++) {
        var row = [];
        for (var j = 0; j < m[0].length; j++) {
            var m1 = getSubMatrix(m, j, i);
            row.push(calcDeterminant(m1));
        }
        minor.push(row);
    }

    return minor;
}

export function findMatrixMax(m: number[][], i: number, j: number, f: string = ''): number {
    var r = i;
    var c = j;
    
    while (r < m.length && m[r][j] == 0) {
        r += 1;
    }

    if (r == m.length) {
        return 0;
    }

    if (f == 'max-col') {
        for (var n = r + 1; n < m.length; n++) {
            if (Math.abs(m[r][j]) < Math.abs(m[n][j])) {
                r = n;
            }
        }
    }
    if (f == 'max-matrix') {
        for (var n = i; n < m.length; n++) {
            for (var k = j; k < m[0].length; k++) {
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
        for (var n = 0; n < m.length; n++) {
            [m[n][c], m[n][j]] = [m[n][j], m[n][c]];
        }
    }
    if (r > i) {
        for (var k = j; k < m[0].length; k++) {
            [m[r][k], m[i][k]] = [m[i][k], m[r][k]];
        }
    }

    return m[i][j];
}

export function calcBareiss(m: number[][], i: number = 0, findMax: string = ''): number[][] | boolean {
    if (m.length > m[0].length && m[0].length == i) {
        for (var j = 0; j < m[0].length; j++) {
            m[i][j] = 0;
        }
        while (m.length > i + 1) {
            m.pop();
        }
        return m;
    } else if (i + 1 == m.length) {
        for (var j = 0; j < i; j++) {
            m[i][j] = 0;
        }
        return m;
    }

    var pivot = findMatrixMax(m, i, i, findMax);

    if (!pivot) {
        return false;
    }

    for (var j = 0; j < i; j++) {
        m[i][j] = 0;
    }

    for (var j = i + 1; j < m.length; j++) {
        for (var k = i + 1; k < m[0].length; k++) {
            var div = (i == 0) ? 1 : m[i - 1][i - 1];
            m[j][k] = (pivot * m[j][k] -  m[j][i] * m[i][k]) / div;
        }
    }

    calcBareiss(m, i + 1, findMax);

    return m;
}

export function calcGauss(m: number[][], i: number = 0, findMax: string = ''): number[][] | boolean {
    if (m.length > m[0].length && m[0].length == i) {
        for (var j = 0; j < m[0].length; j++) {
            m[i][j] = 0;
        }
        while (m.length > i + 1) {
            m.pop();
        }
        return m;
    } else if (i + 1 == m.length) {
        return m;
    }

    var pivot = findMatrixMax(m, i, i, findMax);

    if (pivot == 0) {
        return false;
    }

    for (var j = i + 1; j < m.length; j++) {
        var el = m[j][i];
        m[j][i] = 0;
        for (var k = i + 1; k < m[0].length; k++) {
            m[j][k] = (m[j][k] - (m[i][k] / pivot) * el);
        }
    }

    calcGauss(m, i + 1, findMax);

    return m;
}

export function calcDeterminantGauss(m: number[][]): number {
    var d = 1;

    for (var i = 0; i < Math.min(m[0].length, m.length); i++) {
        d *= m[i][i];
    }

    return d;
}

export function calcRank(m: number[][]): number {
    var EPS: number = Math.pow(10, -9);
    var r: number = 0;
    var selected: boolean[] = Array.apply(0, Array(m[0].length)).map(() => false);
    
    for (var i = 0; i < m[0].length; i++) {
        for (var j = 0; j < m.length; j++) {
            if (!selected[j] && Math.abs(m[j][i]) > EPS)
                break;
        }

        if (j != m.length) {
            ++r;
            selected[j] = true;

            for (var p = i + 1; p < m[0].length; p++) {
                m[j][p] /= m[j][i];
            }

            for (var k = 0; k < m.length ; k ++) {
                if (k != j && Math.abs(m[k][i]) > EPS) {
                    for (var p = i + 1; p < m[0].length; p++) {
                        m[k][p] -= m[j][p] * m[k][i];
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

    var col: number = j;
    var pivot = findMatrixMax(m, i, col);

    while (col < m[0].length && !pivot) {
        col += 1;
        pivot = findMatrixMax(m, i, col);
    }

    if (pivot && pivot != 0) {
        for (var c = j; c < m[0].length; c++) {
            m[i][c] /= pivot;
        }
        
        for (var r = i + 1; r < m.length; r++) {
            var el = m[r][j];
            for (var c = j; c < m[0].length; c++) {
                m[r][c] -= el * m[i][c];
            }
        }
    }

    calcEchelonForm(m, i + 1, j + 1);

    return m;
}

export function calcRowEchelonForm(m: number[][]): number[][] {
    for (var i = 0; i < m.length; i++) {
        var j = i;

        while (j < m[0].length && m[i][j] != 1) {
            j += 1;
        }

        if (j == m[0].length) {
            continue;
        }
        
        for (var r = 0; r < m.length; r++) {
            if (r != i && m[r][j] != 0) {
                var el = m[r][j];
                for (var c = 0; c < m[0].length; c++) {
                    m[r][c] -= el * m[i][c];
                }
            }
        }
    }

    return m;
}

export function roundMatrixValues(m: number[][]): number[][] {
    for (var i = 0; i < m.length; i++) {
        for (var j = 0; j < m[0].length; j++) {
            m[i][j] = Math.floor(m[i][j] * 100) / 100;
        }
    }
    return m;
}