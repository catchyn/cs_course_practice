import { LinkedList } from '../linkedList';
import { Structure } from '../structure';

describe('test lesson 3', () => {
  it('test linked list', () => {
    const list = new LinkedList();
    list.add(1);
    list.add(2);
    list.add(3);

    expect(list.first.value).toBe(1); // 1
    expect(list.last.value).toBe(3); // 3
    expect(list.first.next.value).toBe(2); // 2
    expect(list.first.next.prev.value).toBe(1); // 1
  });
  it('test linked list iterator with some elements', () => {
    const list = new LinkedList();
    list.add(1);
    list.add(2);
    list.add(3);

    expect([...list]).toEqual([1, 2, 3]);
  });
  it('test linked list iterator with one', () => {
    const list = new LinkedList();
    list.add(1);

    expect([...list]).toEqual([1]);
  });
  it('test linked list iterator without elements', () => {
    const list = new LinkedList();

    expect([...list]).toEqual([]);
  });
});

describe('structure', () => {
  it('test success', () => {
    const jackBlack = new Structure([
      ['name', 'utf16', 10], // Число - это максимальное количество символов
      ['lastName', 'utf16', 10],
      ['age', 'u16'], // uint16
    ]);

    jackBlack.setValue('name', 'Jack');
    jackBlack.setValue('lastName', 'Black');
    jackBlack.setValue('age', 53);

    expect(jackBlack.getValue('name')).toBe('Jack');
    expect(jackBlack.getValue('lastName')).toBe('Black');
    expect(jackBlack.getValue('age')).toBe(53);
  });
});
