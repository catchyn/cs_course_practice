// Написать функцию кодирования информации по схеме

import { BitAccessor } from '../../../../utils/bitAccessor';
import { BitAccessorUint8Array } from '../../../../common/bitAccessorUint8Array';

class TypeValueError extends Error {
  constructor(frame: unknown, framePos: number, frameType: string) {
    super(
      `Ошибка типа данных: scheme position ${framePos}, bad type ${frameType}, bad value ${frame}`,
    );
  }
}

class NumberValueError extends Error {
  constructor(frame: unknown, framePos: number, frameType: string) {
    super(
      `Значение числа не соответствуют доступному количеству битов:
       scheme position ${framePos}, bad type ${frameType}, bad value ${frame}`,
    );
  }
}

class AsciiValueError extends Error {
  constructor(frame: unknown, framePos: number, frameType: string) {
    super(
      `Значение строки не соответствует строке из ascii символов либо не помещается в количество битов:
       scheme position ${framePos}, bad type ${frameType}, bad value ${frame}`,
    );
  }
}

type SchemeTypes = 'number' | 'boolean' | 'ascii';

type SchemeItem = [number, SchemeTypes];

const schema: SchemeItem[] = [
  [3, 'number'], // 3 бита число
  [3, 'number'], // 3 бита число
  [1, 'boolean'], // 1 бит логический
  [1, 'boolean'], // 1 бит логический
  [16, 'ascii'], // 16 бит 2 аски символа
];

function encode(data: unknown[], schema: SchemeItem[]): ArrayBuffer {
  const size = schema.reduce<number>((acc, sItem) => acc + sItem[0], 0);
  const buffer = new ArrayBuffer(Math.ceil(size / 8));
  const bitAccessor = new BitAccessorUint8Array(new Uint8Array(buffer));

  if (data.length !== schema.length) {
    throw new Error('Длина массива данных не соответствует схеме.');
  }

  const validDataArray = data.map<{ value: number | boolean | string; schema: SchemeItem }>(
    (value: unknown, i) => {
      const [bitNumber, type] = schema[i];
      if (type === 'number') {
        // проверяем, что передан тип number
        if (typeof value !== 'number') {
          throw new TypeValueError(value, i, typeof value);
        } else if (value !== value << 0 || 1 << bitNumber <= value || value < 0) {
          throw new NumberValueError(value, i, typeof value);
        }
        return { value, schema: schema[i] };
      }

      if (type === 'boolean') {
        if (typeof value !== 'boolean') {
          throw new TypeValueError(value, i, typeof value);
        }
        return { value, schema: schema[i] };
      }

      if (type === 'ascii') {
        if (typeof value !== 'string') {
          throw new TypeValueError(value, i, typeof value);
        } else if (bitNumber % 8 !== 0 || bitNumber < value.length * 8) {
          throw new AsciiValueError(value, i, typeof value);
        }
        return { value, schema: schema[i] };
      }

      throw new Error(`Данный тип: ${type} не поддерживается.`);
    },
  );

  for (let i = 0; i < validDataArray.length; i++) {
    const value = validDataArray[i].value;
    const [bitNumber, type] = validDataArray[i].schema;

    if (type === 'ascii') {
      const asciiValue = value as string;
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(asciiValue);
      uint8Array.forEach((char) => {
        for (let j = 0, str = char as number; j < 8; j++) {
          bitAccessor.write(((str as number) & 1) === 1 ? 1 : 0);
          str = str >>> 1;
        }
      }, []);
    } else if (type === 'boolean') {
      bitAccessor.write(value ? 1 : 0);
    } else {
      for (let j = 0, num = value as number; j < bitNumber; j++) {
        bitAccessor.write(((num as number) & 1) === 1 ? 1 : 0);
        num = num >>> 1;
      }
    }
  }

  return bitAccessor.uint8Array;
}

function decode(data: ArrayBuffer, schema: SchemeItem[]) {
  const bitAccessor = new BitAccessorUint8Array(new Uint8Array(data));
  const result: (string | number | boolean)[] = [];
  schema.forEach((schemaItem: SchemeItem) => {
    const [bitNumber, type] = schemaItem;

    if (type === 'boolean' || type === 'number') {
      let value = 0;
      for (let j = 0; j < bitNumber; j++) {
        const bit = bitAccessor.read();
        value = BitAccessor.set(value, j, bit);
      }
      if (type === 'boolean') {
        result.push(Boolean(value));
      } else if (type === 'number') {
        result.push(value);
      }
    }

    if (type === 'ascii') {
      const symbolNumber = (bitNumber / 8) << 0;
      const asciiArr = new Uint8Array(symbolNumber);
      for (let i = 0; i < symbolNumber; i++) {
        let value = 0;
        for (let j = 0; j < 8; j++) {
          const bit = bitAccessor.read();
          value = BitAccessor.set(value, j, bit);
        }
        asciiArr[i] = value;
      }
      const decoder = new TextDecoder();
      result.push(decoder.decode(asciiArr));
    }
  });
  return result;
}

// Если данные не подходят схеме - выбрасывать исключения с пояснением.
// Результат - ArrayBuffer.
const data = encode([2, 3, true, false, 'ab'], schema);

console.log('data', data);
console.log(decode(data, schema)); // [2, 3, true, false, 'ab']
