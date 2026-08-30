import { animate } from "https://cdn.jsdelivr.net/npm/animejs@4.0.0/+esm";

function scrambleText({ chars = "0-9" } = {}) {
  const charSet = chars === "0-9" ? "0123456789" : chars;
  return (target, key) => {
    const original = target[key];
    const len = String(original).length;
    return {
      to: original,
      onUpdate: (progress) => {
        let result = "";
        for (let i = 0; i < len; i++) {
          if (progress / 100 > i / len) {
            result += String(original)[i];
          } else {
            result += charSet[Math.floor(Math.random() * charSet.length)];
          }
        }
        target[key] = result;
      },
    };
  };
}

export function initScoreAnim() {
  var btn = document.querySelector(".primary-button");
  var scoreEl = document.querySelector("[data-score]");
  if (!btn || !scoreEl) return;

  btn.addEventListener("click", function () {
    const targetValue = parseInt(scoreEl.dataset.score, 10) || 0;
    const len = String(targetValue).length;
    const charSet = "0123456789";

    animate(scoreEl, {
      innerHTML: [0, targetValue],
      duration: 1500,
      onUpdate: (progress) => {
        const current = Math.floor(targetValue * (progress / 100));
        const currentStr = String(current);
        const padLen = len - currentStr.length;
        let result = "";
        for (let i = 0; i < padLen; i++) {
          result += charSet[Math.floor(Math.random() * charSet.length)];
        }
        result += currentStr;
        scoreEl.innerHTML = result;
      },
    });
  });
}
