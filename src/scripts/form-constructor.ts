export default function FormConstructor() {

    const createSubstring = (b1, b2, m, text) => {
        var span = document.createElement('span');

        if (b1 == b2 - 1) {
            var w = text;
        } else if (m.indexOf('?') == b1 + 1) {
            var path = m.replace(/{|\?|}/gi, '').split('.');
            var pattern = path.reduce((v, i) => v[i], vocabulary);
            w = pattern[text[0]];
            if (w === undefined) {
                w = text[1];
            } else if (w.indexOf('{') > -1 && w.indexOf('}') > -1) {
                return this.createString(w, text);
            }
        } else {
            w = this.pluralizeText(text, m.substring(b1 + 1, b2), m.indexOf('#') == -1);
        }

        span.innerHTML = m.substring(0, b1) + w + m.substring(b2 + 1);

        return span;
    }

    const calcMatches = (text) => {
        return text.split('').reduce((v, e) => {
            if (((e == '<' || e == '{') && (
                (v[v.length - 1].match(/<[^\/|<]*>/g) || []).length == (v[v.length - 1].match(/<\/(\w+)>/g) || []).length
            )) || (e == '{' && (v[v.length - 1].match(/{/g) || []).length > 0)) {
                v.push('');
            }
            v[v.length - 1] += e;
            if ((e == '>' && (v[v.length - 1].match(/</g) || []).length == (v[v.length - 1].match(/>/g) || []).length - 1) 
            || (e == '}' && v[v.length - 1][0] != '<')) {
                v.push('');
            }
            return v;
        }, ['']);
    }

    const createString = (text, nums) => {
        var div = document.createElement("span");
        var matches = this.calcMatches(text);
        var i = 0
        for(var m of matches) {
            var b1 = m.indexOf('{');
            var b2 = m.indexOf('}');
            if (b1 == -1 || b2 == -1) {
                var span = document.createElement('span');
                span.innerHTML = m;
            } else if (b1 > -1 && m.indexOf('&') == b1 + 1) {
                var path = m.replace(/{|&|}/gi, '').split('.');
                var pattern = [...path.reduce((v, i) => v[i], vocabulary)];
                
                span = this.appendFormula(pattern, 0, nums);
            } else {
                span = this.createSubstring(b1, b2, m, nums[i]);
                i += 1
            }
            div.append(span);
        }
        return div;
    }

    const makeline = (text: string, nums: string[]) : HTMLDivElement => {
        var div = document.createElement("div");
        div.append(createString(text, nums));
        return div;
    }

    /*const appendFormula = (a, i, vars) => {
        var formula = document.createElement("table");
        var tr = document.createElement("tr");
        //formula.className = classname;
        
        if (i == 0) {
            formula.id = 'formula-table';

            if (typeof vars.result != 'undefined') {
                a.push('= ' + vars.result);
                formula.className = 'formula-table_with-result';
            }
            if (typeof vars.result2 != 'undefined') {
                a.push('= ' + vars.result2);
                formula.className += ' formula-table_with-result2';
            }
        }
        //var prev = null;
        for (cell of a) {
            var td = document.createElement("td");
            if (typeof cell == 'string') {
                if (cell != '&radic;' && cell.indexOf('&radic;') > -1) {
                    td.innerHTML = this.setFormulaVariables(cell.substring(0, cell.indexOf('&radic;') + 7), vars);
                    var span = document.createElement("span");
                    span.className = 'formula-radic';
                    span.innerHTML = this.setFormulaVariables(cell.substring(cell.indexOf('&radic;') + 7), vars);
                    td.append(span);
                } else {
                    td.innerHTML = this.setFormulaVariables(cell, vars);
                }
            } else {
                td.append(this.appendFormula(cell, i + 1, vars));
            }
            //prev = cell;
            
            if (i % 2 == 0) {
                tr.append(td);
            } else {
                tr2 = document.createElement("tr");
                tr2.append(td);
                formula.append(tr2);
            }
        }
        if (i % 2 == 0) {
            formula.append(tr);
        }

        return formula;
    }*/
}