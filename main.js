dotX=0
dotY=0
teethX=0
teethY=0

function preload(){
redDot=loadImage("redDot.jpg")
bunnyEars=loadImage("bunny-ears.png")
bunnyTeeth=loadImage("rabbit-teeth.png")
}

function setup(){
canvas=createCanvas(300,300)
canvas.center()
video=createCapture(VIDEO)
video.size(300,300)
video.hide()
poseNet=ml5.poseNet(video, modelLoaded)
poseNet.on("pose",gotPoses)
}

function draw(){
image(video,0,0,300,300)
image(bunnyEars,dotX,dotY,100,100)
image(bunnyTeeth,teethX,teethY,30,30)
}

function modelLoaded(){
console.log("Model is initialized")
}

function gotPoses(results){
    //console.log(results)
    if(results.length>0){
        console.log("Left Eye X="+results[0].pose.leftEye.x)
        console.log("Right Eye X="+results[0].pose.rightEye.x)
    var leftEye = results[0].pose.leftEye.x
    var rightEye = results[0].pose.rightEye.x
    var distance = rightEye - leftEye
    //console.log(distance/2)
    dotX=leftEye+distance/2-40
    dotY=results[0].pose.leftEye.y-115
    teethX= results[0].pose.nose.x-15
    teethY= results[0].pose.nose.y
}
}

function takeSnapshot(){
    save('BunnyEars.png')
}