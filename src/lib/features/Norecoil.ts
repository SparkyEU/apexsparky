import * as app from '..';

export class Norecoil {
  constructor() {}

  m_old_punch = {x: 0, y: 0, z: 0};
  lastZoomTime = 0;

  updateStates(localPlayer: app.core.Player) {
    const localPlayerViewAngles = localPlayer.viewAngles.value;
    const localPlayerAimPunch = localPlayer.aimpunch.value;
    if (Math.abs(localPlayerAimPunch.x) >= 0.5 || Math.abs(localPlayerAimPunch.y) >= 0.5 || Math.abs(localPlayerAimPunch.z) >= 0.5){
      if (Date.now() - this.lastZoomTime > 1000){
        this.m_old_punch = {x: 0, y: 0, z: 0};
      }
      const modPunch = {
        x: this.m_old_punch.x - localPlayerAimPunch.x,
        y: this.m_old_punch.y - localPlayerAimPunch.y,
        z: this.m_old_punch.z - localPlayerAimPunch.z
      };
      const m_angle = {
        x: localPlayerViewAngles.x + modPunch.x,
        y: localPlayerViewAngles.y + modPunch.y,
        z: localPlayerViewAngles.z + modPunch.z
      };
      localPlayer.viewAngles.value = m_angle;
      this.m_old_punch = localPlayer.aimpunch.value;
      this.lastZoomTime = Date.now();
    }
  }
}
