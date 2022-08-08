import * as app from './lib';
import {ui} from './ui';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');
const frameTime = 1000 / 10;

ui((x) => {
  container.style.display = 'inherit';
  content.textContent = 'Norecoil running. Keep this window open.';
  return renderAsync(x, new app.Norecoil(x));
});

async function renderAsync(core: app.Core, sense: app.Norecoil) {
  while (true) {
    const beginTime = Date.now();
    const players = await core.playersAsync();
    const localPlayer = players.find(x => x.isLocal);
    if (localPlayer) await sense.updateAsync(localPlayer, players);
    await new Promise(x => setTimeout(x, frameTime - (Date.now() - beginTime)));
  }
}
