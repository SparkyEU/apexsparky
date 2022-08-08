import * as app from './lib';
import {ui} from './ui';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');

ui((x) => {
  container.style.display = 'inherit';
  content.textContent = 'Norecoil running. Keep this window open.';
  return renderAsync(x, new app.features.Norecoil());
});

async function renderAsync(core: app.core.Core, norecoil: app.features.Norecoil) {
  await core.runAsync(() => {
    const players = core.entityList.value;
    const localPlayer = players.find(x => x.address === core.localPlayer.value);
    if (localPlayer) norecoil.updateStates(localPlayer);
  });
}
