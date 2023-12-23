random_number = math.floor(Math.random() * quickDrawDataSet) +1;
document.getElementById("sketch_name").innerHTML = 'sketchToBeDrawn'+sketch;
timer_counter = 0;
timer_check = '';


function preload(){
  classifier = ml5.imageClassifier('DoodleNet');

  }
  
  function setup(){
  canvas = createCanvas(280,280);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
  }
  
  function draw(){
  strokeWeight(13);
  stroke("black");
  if(mouseIsPressed)
  {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  }
  
  function clearCanvas() {
    background("white");  
  }
  
  function classifyCanvas(){
    classifier.classify(canvas, gotResult);
  }
  
  function gotResult(error, results) {
    if(error){
      console.log(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = "label : " + results[0].label;
    document.getElementById("confidence").innerHTML = "confidence : " + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
  }

  function getSketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = 'timer'+timer_counter;
    if(timer_counter>400)
    {
      timer_counter = 0;
      timer_check = "completed";
    }
  }