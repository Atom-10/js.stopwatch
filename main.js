const time = document.getElementById("time");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let timer;
let elapsedMs = 0;

function timeToString(countMs) {
  const ms = Math.floor(countMs / 10) % 100;
  const s = Math.floor(countMs / 1000) % 60;
  const m = Math.floor(countMs / 1000 / 60) % 60;
  const h = Math.floor(countMs / 1000 / 3600) % 100;

  const formattedMs = ms.toString().padStart(2, 0);
  const formattedS = s.toString().padStart(2, 0);
  const formattedM = m.toString().padStart(2, 0);
  const formattedH = h.toString().padStart(2, 0);

  return `${formattedH}:${formattedM}:${formattedS}:${formattedMs}`;
}

start.addEventListener("click", () => {
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  document.getElementById("reset").disabled = false;

  let startMs = Date.now();
  startMs -= elapsedMs;

  timer = setInterval(() => {
    let nowMs = Date.now();
    elapsedMs = nowMs - startMs;
    time.textContent = timeToString(elapsedMs);

    stop.addEventListener("click", () => {
      document.getElementById("start").disabled = false;
      document.getElementById("stop").disabled = true;
      document.getElementById("reset").disabled = false;
      clearInterval(timer);
      time.textContent = timeToString(elapsedMs);
      start.textContent = "リスタート";
      start.classList.add("reStart");
    });

    reset.addEventListener("click", () => {
      document.getElementById("start").disabled = false;
      document.getElementById("stop").disabled = true;
      document.getElementById("reset").disabled = true;
      clearInterval(timer);
      elapsedMs = 0;
      time.textContent = `00:00:00:00`;
      start.textContent = "スタート";
      start.classList.remove("reStart");
    });

    if (time.textContent === `99:59:59:99`) {
      clearInterval(timer);
    }
  }, 10);
});
