import * as basicLightbox from 'basiclightbox';

const box = document.querySelector('.js-box');
const winnerArr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let player = 'X';
let arrX = [];
let arrO = [];

function createMrkp() {
  let murkup = ``;
  for (let i = 1; i <= 9; i++) {
    murkup += `<div data-id='${i}'class="js-cell cell"></div>`;
  }
  box.innerHTML = murkup;
}
createMrkp();

box.addEventListener('click', onClickCell);
function onClickCell(evt) {
  const el = evt.target;
  if (!el.classList.contains('js-cell') || el.textContent) {
    return;
  }
  // el.textContent = player;
  // player = player === 'X' ? '0' : 'X';
  let result = false;

  if (player === 'X') {
    arrX.push(Number(el.dataset.id));
    if (arrX.length + arrO.length === 9) {
      const instance = basicLightbox.create(`
            <h2 class="message-title">TRY AGAIN !((</h2>
        `);
      instance.show();
      setTimeout(() => {
        instance.close();
      }, 1500);
      clearGameBox(createMrkp);
    }
    result = arrX.length >= 3 ? isWinner(arrX) : false;
    console.log('x', arrX);
    console.log('o', arrO);
  } else {
    arrO.push(Number(el.dataset.id));
    result = arrO.length >= 3 ? isWinner(arrO) : false;
    console.log('x', arrX);
    console.log('o', arrO);
  }

  el.textContent = player;
  if (result) {
    const instance = basicLightbox.create(`
        <h2 class="message-title">WINNER ${player})))</h2>
      `);
    instance.show();
    setTimeout(() => {
      instance.close();
    }, 1500);
    clearGameBox(createMrkp);
    return;
  }

  player = player === 'X' ? '0' : 'X';
}
function isWinner(historyArr) {
  const winner = winnerArr.some(item =>
    item.every(el => historyArr.includes(el))
  );
  return winner;
}

function clearGameBox(createMurkup) {
  arrO = [];
  arrX = [];
  player = 'X';
  createMurkup();
}
