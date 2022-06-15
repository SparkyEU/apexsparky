import * as app from '..';

export class UInt32Pointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 0x4);
  }

  get value() {
    return this.buffer.getUint32(0);
  }

  set value(value: number) {
    this.buffer.setUint32(0, value);
  }

  toString() {
    return this.value.toString();
  }
}
