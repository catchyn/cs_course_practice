export class BitPointerBitArray {
    bitMax = 8;
    bitNumber = 0;
    pointer: [number, number] = [0, 0];

    constructor(bitMax: number) {
        this.bitMax = bitMax;
    }

    next() {
        this.bitNumber++;
        this.pointer = [(this.bitNumber / this.bitMax) << 0, this.bitNumber % this.bitMax];
        return this.pointer;
    }

    get() {
        return this.pointer;
    }
}