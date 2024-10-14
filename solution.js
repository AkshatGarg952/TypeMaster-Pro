const sentencesList = [
    `The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the English alphabet.`,
    `Sphinx of black quartz, judge my vow. The quick movements of the sphinx are mesmerizing, and its enigmatic smile is captivating.`,
    `Pack my box with five dozen liquor jugs. It’s a challenging task to organize such a large quantity, but it’s essential for a successful party.`,
    `How vexingly quick daft zebras jump! These zebras exhibit incredible agility, making them fascinating creatures to observe in the wild.`,
    `A journey of a thousand miles begins with a single step. This profound statement reminds us that great achievements often start with small actions.`,
    `To be or not to be, that is the question. This line from Shakespeare's Hamlet reflects the complexity of human existence and the nature of life and death.`,
    `In the midst of chaos, there is also opportunity. This idea emphasizes that challenging situations often contain the seeds of potential success.`,
    `Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful in your pursuits.`,
    `The rain in Spain stays mainly in the plain. This phrase highlights the geographical quirks of Spain and has been popularized in literature and film.`,
    `To create something exceptional, your mindset must be relentlessly focused on the smallest detail. Excellence is in the details, and nothing is too small to be improved upon.`
  ];
  
  let startBtn = document.querySelector('#start-btn');
  let text = document.querySelector('#sentence');
  let input = document.querySelector('#input');
  let timerSec = document.querySelector('#timer');
  let result = document.querySelector('#result');
  let retryBtn = document.querySelector("#retry-btn");
  let speed = document.querySelector("#speed");
  let accuracy = document.querySelector("#accuracy");
  
  let seconds = 0;
  let minuts = 0;
  let examTime = 30;
  
  let timer;
  
  startBtn.addEventListener('click', startTest);
  
  function startTest() {
      input.disabled = false;
      input.focus();
      input.placeholder = "Write the above text...";
      
      
      let randomIndex = Math.floor(Math.random() * sentencesList.length);
      let selectedSentence = sentencesList[randomIndex];
      text.textContent = selectedSentence;
  
      startBtn.style.display = 'none';
  
      seconds = examTime;
      minuts = 0;
      timerSec.innerText = `${(minuts > 9) ? minuts : '0' + minuts}:${(seconds > 9) ? seconds : '0' + seconds}`;
  
      timer = setInterval(() => {
          --seconds;
          timerSec.innerText = `${(minuts > 9) ? minuts : '0' + minuts}:${(seconds > 9) ? seconds : '0' + seconds}`;
          if (seconds === 0) {
              endTest();
          }
      }, 1000);
  }
  
  function endTest() {
      input.disabled = true;
      seconds = 0;
      minuts = 0;
      result.style.display = 'block';
      calculate();
      clearInterval(timer);
  }
  
  retryBtn.addEventListener('click', () => {
      input.value = '';
      result.style.display = 'none';
      startBtn.style.display = 'inline-block';
      input.disabled = true;
  });
  
  function getWordsArray(str) {
      let tempStr = str.replaceAll('\n', ' ').replaceAll('  ', ' ').split(' ');
      tempStr = tempStr.filter(element => {
          return !(element === '');
      });
  
      return tempStr;
  }
  
  function calculate() {
      let selectedSentence = text.textContent; 
      let sentencesW = getWordsArray(selectedSentence);
      let data = input.value;
      let totalW = getWordsArray(data);
      let correctW = totalW.filter(element => {
          return sentencesW.includes(element);
      });
  
      speed.textContent = parseInt(correctW.length * 60 / examTime);
  
      let correctCharsCounts = 0;
      let len = (data.length < selectedSentence.length) ? data.length : selectedSentence.length;
      for (let i = 0; i < len; i++) {
          if (data[i] === selectedSentence[i]) {
              correctCharsCounts++;
          }
      }
  
      accuracy.textContent = (correctCharsCounts * 100 / data.length).toFixed(2);
  
      console.log(totalW);
      console.log(correctW);
      console.log(correctCharsCounts);
  }
