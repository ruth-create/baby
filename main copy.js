img="";
status = "";

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Baby";

}

function preload(){
    img=loadImage("baby2.jpeg");
    song=loadSound("ringing_old_phone.mp3")
}

function draw(){
    image(img,0,0,380,380);
    if(status !=""){
        objectDetector.detect(video,gotResult);


        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML= "Status : Object Detected!";
            fill("#5b94f0");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+30, objects[i].y+20);
            noFill();
            stroke("#5b94f0");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
            document.getElementById("status").innerHTML="Baby is Found!!!";
            song.stop();
            }
            else{
                document.getElementById("status").innerHTML="Baby is not Found";
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("status").innerHTML="Baby is not Found";
                song.play();
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}