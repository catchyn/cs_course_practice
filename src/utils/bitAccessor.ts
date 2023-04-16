import {Bit} from "../types/Bit";

export class BitAccessor {
    /**
     * Получаем значение по индексу элемента и номеру бита справа-налево.
     * @param num битовое значение
     * @param bitNumber номер бита
     */
    static get(num: number, bitNumber: number): Bit {
        return (num & (1 << bitNumber)) != 0 ? 1 : 0;
    }

    /**
     * Выставляем значение в число по индексу элемента и номеру бита справа-налево.
     * @param num индекс элемента
     * @param num_bit номер бита
     * @param value значение бита
     */
    static set(num: number, num_bit: number, value: Bit) {
        if (value === 0) {
            num = num & ~(1 << num_bit);
        } else {
            num = num | (1 << num_bit);
        }
        return num;
    }
}