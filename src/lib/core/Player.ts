import * as app from '..';
import {playerOffsets} from './offsets/playerOffsets';
export class Player extends app.Entity {
  constructor(address: bigint,
    readonly isLocal: boolean,
    readonly lifeState = new app.UInt8Pointer(address + playerOffsets.lifeState),
    readonly shieldHealth = new app.UInt8Pointer(address + playerOffsets.shieldHealth),
    readonly shieldHealthMax = new app.UInt8Pointer(address + playerOffsets.shieldHealthMax),
    readonly health = new app.UInt8Pointer(address + playerOffsets.iHealth),
    readonly healthMax = new app.UInt8Pointer(address + playerOffsets.iMaxHealth),
    readonly viewAngles = new app.VectorPointer(address + playerOffsets.viewAngles),
    readonly bleedoutState = new app.UInt8Pointer(address + playerOffsets.bleedoutState)) {
    super(address);
  }
  
  get isValid() {
    return this.name.value
      && !this.lifeState.value
      && !app.shallowEquals(this.localOrigin.value, new app.Vector(0, 0, 0));
  }
  
  createColor(otherPlayer: app.Player, mode?: string) {
    if(!this.isLocal && !this.bleedoutState.value && !this.isSameTeam(otherPlayer, mode)){
      if(this.shieldHealth.value < Math.floor(this.shieldHealthMax.value/3) && this.health.value < Math.floor(this.healthMax.value/3)){
         return '#FFFF00';
       }else if(this.shieldHealthMax.value == 50){
          return '#FFCCFF';
       }else if(this.shieldHealthMax.value == 75){ 
         return '#00FFFF';
       }else if(this.shieldHealthMax.value == 100){ 
         return '#FF00FF';
       }else if(this.shieldHealthMax.value == 125){
         return '#FF0000';
       }else{
         return '#FFCCFF';
       }
      
    }else{
      return this.isLocal ? '#0000FF' : this.isSameTeam(otherPlayer, mode)
        ? (this.bleedoutState.value ? '#FFFF00' : '#00FF00')
        : (this.bleedoutState.value ? '#FFA500' : '#FF0000');
    }
  }
  isSameTeam(otherPlayer: app.Player, mode?: string) {
    switch (mode) {
      case 'control':
        return this.teamNum.value % 2 === otherPlayer.teamNum.value % 2;
      default:
        return this.teamNum.value === otherPlayer.teamNum.value;
    }
  }
  toString() {
    return app.serialize(this);
  }
}
