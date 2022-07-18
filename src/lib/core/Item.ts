export class Item extends app.Entity {
  constructor(address: bigint,
    readonly isLocal: boolean,
    readonly itemId = new app.UInt8Pointer(address + entityOffsets.itemId)
    ) {
    super(address);
  }
