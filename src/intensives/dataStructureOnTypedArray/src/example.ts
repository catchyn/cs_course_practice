import { fixedAsciiString, Struct, U16, U8 } from './dataStructures';
import { TypedArray } from './dataStructures/TypedArray';

const houseShorts = new Struct({
  name: fixedAsciiString(20),
});

const HouseStruct = new Struct({
  age: U8,
  flats: U16,
  street: fixedAsciiString(20),
  city: fixedAsciiString(20),
  founder: new Struct({
    name: fixedAsciiString(20),
    address: fixedAsciiString(50),
  }),
  others: new TypedArray(houseShorts, 2),
});

const houses = new TypedArray(HouseStruct, 3);

const house1 = {
  age: 8,
  flats: 24,
  street: 'street',
  city: 'Yar',
  founder: { name: 'KORTROS', address: 'Naumova' },
  others: [{ name: 'any' }],
};

const house2 = {
  ...house1,
  age: 10,
  flats: 1,
};

const house3 = {
  ...house1,
  age: 1,
  flats: 1000,
  city: 'Moscow',
};

console.log(HouseStruct.create(house1).buffer);

console.log(houses.create([house1, house2, house3]).buffer);
