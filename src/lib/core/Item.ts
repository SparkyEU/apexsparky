export class Item extends app.Entity {
  constructor(address: bigint,
    readonly isLocal: boolean,
    readonly itemId = new app.UInt8Pointer(address + entityOffsets.itemId),
    readonly cPropSurvival = new app.UInt64Pointer(address + entityOffsets.cPropSurvival),
    readonly m_iSignifierName = new app.CStringPointer(address + entityOffsets.m_iSignifierName, 32)
    ) {
    super(address);
  }
