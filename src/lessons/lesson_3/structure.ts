type StructureScheme = Utf16Scheme | U16Scheme;
type Utf16Scheme = [name: string, type: 'utf16', number: number];
type U16Scheme = [name: string, type: 'u16'];
type SchemeTypes = StructureScheme extends [string, infer P, ...rest: any] ? P : never;
type SchemeValues<T> = T extends SchemeTypes ? (T extends 'utf16' ? string : number) : never;

export class Structure {
  buffer: Uint16Array;
  nameMap: Map<string, ISchemeHelper>;

  constructor(protected scheme: StructureScheme[]) {
    let offset = 0;
    const factory = new SchemeHelperFactory();
    this.nameMap = new Map();
    for (const [name, type, nums] of scheme) {
      const helper = factory.create(type, offset / 16, nums);
      this.nameMap.set(name, helper);
      offset += helper.bitNums;
    }
    this.buffer = new Uint16Array(offset / 16);
  }

  getValue(name: string) {
    const helper = this.nameMap.get(name);
    return helper.getValue(this.buffer);
  }

  setValue(name: string, value) {
    const helper = this.nameMap.get(name);
    helper.check(value);
    return helper.setValue(this.buffer, value);
  }
}

interface ISchemeHelper<ReturnValue = unknown> {
  offset: number;
  get bitNums(): number;
  getValue(buffer: Uint16Array): ReturnValue;
  setValue(buffer: Uint16Array, value: ReturnValue): void;
  check(value: ReturnValue): void;
}

class U16SchemeHelper implements ISchemeHelper<SchemeValues<'u16'>> {
  bitPerElement = 16;
  constructor(public offset: number) {}

  get bitNums() {
    return this.bitPerElement;
  }

  getValue(buffer: Uint16Array) {
    return buffer[this.offset];
  }

  setValue(buffer: Uint16Array, value: SchemeValues<'u16'>): void {
    buffer.set([value], this.offset);
  }

  check(value: SchemeValues<'u16'>) {
    if (typeof value !== 'number') {
      throw Error('Тип u16 должен хранить число');
    }
    if (value >= 2 ** 16) {
      throw Error('Число слишком большое');
    }
  }
}

class Utf16SchemeHelper implements ISchemeHelper<SchemeValues<'utf16'>> {
  bitPerElement = 16;
  constructor(public offset: number, protected symbolNum: number) {}

  get bitNums() {
    return this.bitPerElement * this.symbolNum;
  }

  getValue(buffer: Uint16Array) {
    let text = '';
    for (let i = 0; i < this.symbolNum; i++) {
      const value = buffer[this.offset + i];
      if (!value) {
        break;
      }
      text += String.fromCharCode(value);
    }
    return text;
  }

  setValue(buffer: Uint16Array, value: SchemeValues<'utf16'>): void {
    const chars = [...value].map((char) => char.charCodeAt(0));
    buffer.set(chars, this.offset);
  }

  check(value: SchemeValues<'utf16'>) {
    if (typeof value !== 'string') {
      throw Error('Тип utf16 должен хранить строку');
    }
    if (value.length > this.symbolNum) {
      throw Error('Строка слишком большая');
    }
  }
}

class SchemeHelperFactory {
  public create(type: SchemeTypes, offset: number, symbolNum?: number): ISchemeHelper {
    if (type === 'u16') {
      return new U16SchemeHelper(offset);
    } else if (type === 'utf16') {
      return new Utf16SchemeHelper(offset, symbolNum);
    } else {
      throw Error('Unrecognized scheme type');
    }
  }
}
