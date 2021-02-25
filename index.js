let delay = 200;
let arr = new Array(10).fill(null);

const sortButton = document.querySelector('.sortButton');
const resetButton = document.querySelector('.resetButton');
const delaySubmitButton = document.querySelector('.delaySubmit');
const delayInput = document.querySelector('.delayInput');
const sizeSelect = document.querySelector('.sizeSelect');

delaySubmitButton.addEventListener('click', () => {
  delay = delayInput.value ? +delayInput.value : delay;
  delayInput.value = '';
});

anychart.onDocumentLoad(function () {
  const chart = anychart.column();
  const series = chart.column();

  const resetArray = () => {
    arr = arr.map(() => Math.round(Math.random() * (1000 - 1) + 1));
    series.data(arr.map((el) => [el, el]));
  };

  resetArray();
  chart.barGroupsPadding(0);
  chart.title('Comb Sorting');
  chart.container('container');
  chart.draw();

  const selectTimeout = (iteration, i, j) => {
    setTimeout(() => {
      series.select([i, j]);
    }, iteration * delay);
  };

  const changeTimeout = (arr, iteration) => {
    const copyArr = arr.slice();
    setTimeout(() => {
      series.data(copyArr.map((el) => [el, el]));
    }, iteration * delay);
  };

  const combSort = (arr) => {
    sortButton.disabled = resetButton.disabled = sizeSelect.disabled = true;
    let iteration = 1;
    const size = arr.length;
    const factor = 1.247;
    let gapFactor = size / factor;

    while (gapFactor > 1) {
      const gap = Math.round(gapFactor);
      for (let i = 0, j = gap; j < size; i++, j++) {
        selectTimeout(iteration, i, j);
        if (arr[i] > arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          changeTimeout(arr, iteration);
        }
        iteration++;
      }
      gapFactor = gapFactor / factor;
    }

    setTimeout(() => {
      series.select([]);
      resetButton.disabled = sizeSelect.disabled = false;
    }, iteration * delay);
    return arr;
  };

  sortButton.addEventListener('click', () => {
    combSort(arr);
  });

  resetButton.addEventListener('click', () => {
    resetArray();
    sortButton.disabled = false;
  });

  sizeSelect.addEventListener('change', () => {
    arr.length = sizeSelect.value;
    arr.fill(null);
    resetArray();
    sortButton.disabled = false;
  });
});
