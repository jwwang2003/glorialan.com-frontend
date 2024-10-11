export function Keybinds(
  e: KeyboardEvent,
  condition: [(e: KeyboardEvent) => boolean],
  callback: [() => any],
  fired: boolean[]
) {
  for(let i = 0; i < condition.length && callback.length; ++i) {
    if(condition[i](e) && !fired[0]) {
      fired[0] = true;
      callback[i]();
    }
  }
}

export function Keybind(
  e: KeyboardEvent,
  condition: (e: KeyboardEvent) => boolean,
  callback: () => any,
  fired: boolean[]
) {
  if(condition(e) && !fired[0]) {
    fired[0] = true;
    callback();
  }
}

