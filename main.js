status=""
objects=[]

function preload()
{
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()
    video.size(380,380)
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function draw()
{
    image(video,0,0,380,380);
   // rect(30,60,459,350);
   // text("Dog", 45,75)
   // fill("#FF0000")
   // noFill()    //Used to unset the color//
    // stroke("#FF0000")

  //  fill("#FF0000")
   // stroke("#FF0000")
  //  noFill()
  //  text("Cat", 320, 120)
    // rect(300,90,270,320)//

    // Using for-loop to draw a rectangle, labels , color

    if(status !="")
    {
        r=random(255)
        g=random(255)
        b=random(255)
        object_detector.detect(video,gotresults)
        
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected"
            document.getElementById("number_of_object").innerHTML="Number of Objects Detected are :" + objects.length;

            fill(r,g,b)
            percent=floor(objects[i].confidence * 100)
            text(objects[i].label+ " " + percent + "%",objects[i].x,objects[i].y)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

}

function modelLoaded()
{
    console.log("modelLoaded")
    status=true
}

function gotresults(error,results)
{
    if (error)
    {
        console.log(error)
    }
    else 
    {
        console.log(results)
        objects=results;
    }
}
