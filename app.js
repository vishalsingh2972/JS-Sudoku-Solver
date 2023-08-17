const puzzleBoard = document.querySelector('#puzzle');
const solveButton = document.getElementById('solve-button');
const solutionDisplay = document.querySelector('#solution');
const squares = 81;
const submission = []; //input data submitted to API

for(let i = 0; i < squares; i++){
  const inputElement = document.createElement('input');
  //inputElement.placeholder = `${i}`; //inputElement.placeholder = 'X'; 
  inputElement.setAttribute('type', 'number');
  inputElement.setAttribute('min', '1');
  inputElement.setAttribute('max', 9);
 
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)){
      inputElement.classList.add('neelu');
  } 
  else {
      inputElement.classList.add('peelu');
  } 
  
  puzzleBoard.appendChild(inputElement);
}

const jointValues = () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(INPUT => {
          if(INPUT.value){
              submission.push(INPUT.value);
          }
          else{
              submission.push('.');
          }
      })
      console.log(submission);
}

const populateValues = (isSolvable, solution) => {
      const inputs2 = document.querySelectorAll('input');
      if(isSolvable && solution){
        inputs2.forEach((INPUT2,index) =>{
            INPUT2.value = solution[index];
        })
        solutionDisplay.innerHTML = 'This is the answer';
      }
      else{
        solutionDisplay.innerHTML = 'This is not solvable';
      }
}

//function calling the API
const solve = () => {

    jointValues();
    const data = submission.join('');
    console.log('data', data);

    const options = {
      method: 'POST',
      url: 'https://solve-sudoku.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'Enter RapidAPI Key here',
        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
      },
      data: {
        puzzle: data
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      populateValues(response.data.solvable, response.data.solution);
    }).catch(function (error){
      console.log(error);
    });
}

//solveButton.addEventListener('click', jointValues);
solveButton.addEventListener('click', solve);
