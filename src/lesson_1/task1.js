"use strict";
/**
 * Написать функцию, которая принимает Uint8Array и позволяет обратиться к биту конкретного элемента.
 */
/**
 * Класс обработки Uint8Array.
 */
class ProcessUint8Array {
    constructor(uint8Array) {
        this.uint8Array = uint8Array;
        this.maxSize = uint8Array.length;
    }
    /**
     * В случае, если диапазон значений некорректный выбрасываем исключение.
     * @param index индекс элемента
     * @param num_bit номер бита
     */
    checkCorrectRange(index, num_bit) {
        if (index < 0 || index >= this.maxSize) {
            throw new Error(`Допустимо использовать индексы в диапазоне от 0 до ${this.maxSize - 1} включительно.`);
        }
        if (num_bit < 0 || num_bit > 7) {
            throw new Error('Uint8Array может содержать не более 8 битов.');
        }
    }
    /**
     * Получаем значение в массиве Uint8Array по индексу элемента и номеру бита справа-налево.
     * @param index индекс элемента
     * @param num_bit номер бита
     */
    get(index, num_bit) {
        this.checkCorrectRange(index, num_bit);
        return (this.uint8Array[index] & (1 << num_bit)) != 0 ? 1 : 0;
    }
}
const createBitGetter = (uint8Array) => {
    return new ProcessUint8Array(uint8Array);
};
const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));
// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0
try {
    console.log(bitGetter.get(2, 1)); // 0
}
catch (e) {
    console.log(e === null || e === void 0 ? void 0 : e.message);
}
try {
    console.log(bitGetter.get(1, 9)); // 0
}
catch (e) {
    console.log(e === null || e === void 0 ? void 0 : e.message);
}
