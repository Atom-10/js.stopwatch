const time = document.getElementById("time");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let timer;
let elapsedMs = 100;
// デバッグ用
// let elapsedMs = 995000;

function timeToString(countMs) {
  const first = Math.floor(countMs / 100) % 10;
  const second = Math.floor(countMs / 1000) % 10;
  const third = Math.floor(countMs / 10000) % 10;
  const fourth = Math.floor(countMs / 100000) % 10;

  const formattedFirst = first.toString().padStart(1, 0);
  const formattedSecond = second.toString().padStart(1, 0);
  const formattedThird = third.toString().padStart(1, 0);
  const formattedFourth = fourth.toString().padStart(1, 0);

  return `${formattedFourth}:${formattedThird}:${formattedSecond}:${formattedFirst}`;
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
      time.textContent = `0:0:0:0`;
      start.textContent = "スタート";
      start.classList.remove("reStart");
    });

    if (time.textContent === `9:9:9:9`) {
      clearInterval(timer);
    }
  }, 10);
});
