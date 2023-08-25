enum SCHEME_PROP_TYPE {
    'utf16' = 'utf16',
    'u16' = 'u16'
}

type SchemeItemUtf16 = [prop: string, type: SCHEME_PROP_TYPE.utf16, length: number];
type SchemeItemU16 = [prop: string, type: SCHEME_PROP_TYPE.u16];

function findOffsetParam(scheme: (SchemeItemUtf16 | SchemeItemU16)[], prop: string ): [number, SchemeItemUtf16 | SchemeItemU16] {
    let offset = 0, i = 0;
    while (prop !== scheme[i][0]) {
        offset = offset + (scheme[i][1] === SCHEME_PROP_TYPE.utf16 ? (scheme[i][2] || 0) : 1);
        i++;
    }
    return [offset, scheme[i]];
}

function insertUtf16ToArray(value: string, offset: number, uint16Array: Uint16Array, length: number) {
    for(let i = offset; i < offset + length; i++) {
        uint16Array[i] = value.charCodeAt(i - offset);
    }
    return uint16Array;
}

function Structure(scheme: (SchemeItemUtf16 | SchemeItemU16)[]) {
    const length = scheme.reduce((acc, [,type, length]) => {
        if (type === SCHEME_PROP_TYPE.utf16) {
            return acc + (length || 0);
        }
        return acc + 1;
    }, 0);

    let uint16Array = new Uint16Array(length);

    return {
        set(prop: string, value: string | number) {
            // найти в scheme
            const [offset, [,type, length]] = findOffsetParam(scheme, prop);
            if (type === SCHEME_PROP_TYPE.u16) {
                uint16Array[offset] = value as number;
            } else {
                uint16Array = insertUtf16ToArray(value as string, offset, uint16Array, length as number);
            }
        },
        get(prop: string): string | number {
            const [offset, [,type, length]] = findOffsetParam(scheme, prop);
            if (type === SCHEME_PROP_TYPE.u16) {
                return uint16Array[offset];
            } else {
                return String.fromCharCode(...uint16Array.slice(offset, offset + (length as number)));
            }
        }
    }
}

// Реализовать структуру на основе ArrayBuffer
const jackBlack = Structure([
    ['name', SCHEME_PROP_TYPE.utf16, 10], // Число - это максимальное количество символов
    ['lastName', SCHEME_PROP_TYPE.utf16, 10],
    ['lastName', SCHEME_PROP_TYPE.utf16, 10],
    ['age', SCHEME_PROP_TYPE.u16] // uint16
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);

console.log(jackBlack.get('name')); // 'Jack'
console.log(jackBlack.get('lastName')); // 'Black'
console.log(jackBlack.get('age')); // '53'
