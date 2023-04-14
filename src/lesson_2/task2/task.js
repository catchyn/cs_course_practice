"use strict";
// Написать функцию кодирования информации по схеме
class TypeValueError extends Error {
    constructor(frame, framePos, frameType) {
        super(`Ошибка типа данных: scheme position ${framePos}, bad type ${frameType}, bad value ${frame}`);
    }
}
class NumberValueError extends Error {
    constructor(frame, framePos, frameType) {
        super(`Значение числа не соответствуют доступному количеству битов:
       scheme position ${framePos}, bad type ${frameType}, bad value ${frame}`);
    }
}
class AsciiValueError extends Error {
    constructor(frame, framePos, frameType) {
        super(`Значение строки не соответствует ascii: scheme position ${framePos}, bad type ${frameType}, bad value ${frame}`);
    }
}
const schema = [
    [3, 'number'],
    [3, 'number'],
    [1, 'boolean'],
    [1, 'boolean'],
    [16, 'ascii'], // 16 бит 2 аски символа
];
function encode(data, schema) {
    const size = schema.reduce((acc, sItem) => acc + sItem[0], 0);
    const buffer = new ArrayBuffer(size);
    const arr = new Uint8Array(buffer);
    if (data.length !== schema.length) {
        throw new Error('Длина массива данных не соответствует схеме.');
    }
    const bitStringArray = data.map((value, i) => {
        const [bitNumber, type] = schema[i];
        if (type === 'number') {
            // проверяем, что передан тип number
            if (typeof value !== 'number') {
                throw new TypeValueError(value, i, typeof value);
            }
            else if (value !== value << 0 || 1 << (bitNumber - 1) < value) {
                throw new NumberValueError(value, i, typeof value);
            }
            return value.toString(2);
        }
        if (type === 'boolean') {
            if (typeof value !== 'boolean') {
                throw new TypeValueError(value, i, typeof value);
            }
            return value ? '1' : '0';
        }
        if (type === 'ascii') {
            if (typeof value !== 'string') {
                throw new TypeValueError(value, i, typeof value);
            }
            else if (bitNumber % 8 !== 0 || bitNumber < value.length * 8) {
                throw new AsciiValueError(value, i, typeof value);
            }
            const encoder = new TextEncoder();
            const uint8Array = encoder.encode(value);
            return uint8Array.reduce((acc, unit8elem) => acc + unit8elem.toString(2), '');
        }
    });
    const bitString = bitStringArray.reduce((acc, item) => acc + item, '');
    for (let i = 0; i < bitString.length; i += 8) {
        arr[(i / 8) << 0] = parseInt(bitString.slice(i, i + 8));
    }
    return arr.buffer;
}
// Если данные не подходят схеме - выбрасывать исключения с пояснением.
// Результат - ArrayBuffer.
const data = encode([2, 3, true, false, 'ab'], schema);
console.log(data);
