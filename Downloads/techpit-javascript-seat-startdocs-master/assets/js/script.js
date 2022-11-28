
const setTargetStudents = (studentNumber)=>{
  let studentNumberList = [];
  for(let i = 1; i <= studentNumber;i++){
    studentNumberList.push(i);
  }
  const absenteeNumbers = document.querySelector("#absence").value;
  const splitedAbsenteeNumbers = absenteeNumbers.split(",").map(function(item, index){
    return parseInt(item);
  });

  studentNumberList = studentNumberList.filter((student)=>{
    return !splitedAbsenteeNumbers.includes(student);
  })

  return studentNumberList;
}

const shuffleArray = (studentNumberList)=>{
  for(let i = studentNumberList.length; i > 0; i--){
    const randomNum = Math.floor(Math.random() * i);
    let tmp = studentNumberList[i - 1];
    studentNumberList[i - 1] = studentNumberList[randomNum];
    studentNumberList[randomNum] = tmp;
  }

  return studentNumberList;
}

const showSeatBoxes = (shuffleStudent)=>{
  let insertHTML = '';
  shuffleStudent.forEach(function(num){
    insertHTML += `<div class="seat__item">${num}</div>`;
  })
  document.querySelector('#seat').innerHTML = insertHTML;
}

const soundPlay = (timer)=>{
  const audioElement = new Audio();
  audioElement.src = 'assets/audio/drum.mp3';
  audioElement.play();

  audioElement.addEventListener('ended', function(){
    clearInterval(timer);
  })
}

document.querySelector('#btn-start').addEventListener('click', ()=>{
  const studentNumber = document.querySelector("#studentNumber").value;
  const studentUpperlimit = 50;
  const studentNumberIsEmpty = studentNumber === "";
  if(studentNumberIsEmpty){
    alert('人数が未入力です！入力してからスタートボタンを押してください。');
    return false;
  }

  if(studentNumber > studentUpperlimit){
    alert('人数は${studentUpperlimit}人以内に設定してください!');
    return false;
  }
  document.querySelector('.c-overlay').classList.add("is-closed");


  const studentNumberList = setTargetStudents(studentNumber);
  const timer = setInterval(()=>{
    const shuffleStudent = shuffleArray(studentNumberList);
    showSeatBoxes(shuffleStudent);
  },50);

  soundPlay(timer);
});