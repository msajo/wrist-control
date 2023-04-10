song ="";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWristY_score = 0;
rightWristY_score = 0;
function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("Posenet model has been loaded");
}
function draw(){
    image(video,0,0,600,500);
    if(leftWristY_score > 0.2){
        fill("red");
    stroke("red");
    circle(leftWristX,leftWristY,30);
    leftWristY_number = Number(leftWristY);
    NewleftWrist_number = Math.floor(leftWristY_number);
    volume = NewleftWrist_number / 500;
    song.setVolume(volume);
    document.getElementById("vol").innerHTML = "Volume: "+volume;
    }
    fill("red");
    stroke("red");
    if(rightWristY_score > 0.2){
        circle(rightWristX,rightWristY,30);
    if(rightWristY >0 && rightWristY<= 100){
        document.getElementById("sp").innerHTML = "Speed: 0.5";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY<= 200){
        document.getElementById("sp").innerHTML = "Speed: 1";
        song.rate(1); 
    }
    else if(rightWristY >200 && rightWristY<= 300){
        document.getElementById("sp").innerHTML = "Speed: 1.5";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY<= 400){
        document.getElementById("sp").innerHTML = "Speed: 2";
        song.rate(2);
    }
    else if(rightWristY >400 && rightWristY<= 500){
        document.getElementById("sp").innerHTML = "Speed: 2.5";
        song.rate(2.5);
    }
    }
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X position is "+ leftWristX + " Left Wrist Y position is "+ leftWristY);
        console.log("Right Wrist X position is "+ rightWristX + " Right Wrist Y position is " + rightWristY);

        leftWristY_score = results[0].pose.keypoints[9].score;
        console.log(leftWristY_score);

        rightWristY_score = results[0].pose.keypoints[10].score;
        console.log(rightWristY_score);
    }
}