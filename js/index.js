window.onload = function() {
  var video = document.getElementById('video'),
      canvas = document.getElementById('canvas'),
      box = document.getElementById('box'),
      context = canvas.getContext('2d');
     
      tracking.ColorTracker.registerColor('red', function (r, g, b) {
        if (r > 200 && g > 30 && g < 90 && b > 35 && g < 65) {
          return true;
        }
         return false;
      });
      tracking.ColorTracker.registerColor('orange', function (r, g, b) {
        if (r > 200 && g > 70 && g < 160 && b > 25 && b < 40) {
          return true;
        }
         return false;
      });
      tracking.ColorTracker.registerColor('yellow', function (r, g, b) {
        if (r > 150 && g > 170 && b > 46 && b < 90) {
          return true;
        }
         return false;
      });
      tracking.ColorTracker.registerColor('green', function (r, g, b) {
        if (r < 209 && g > 200 && b < 160) {
          return true;
        }
         return false;
        });
      tracking.ColorTracker.registerColor('bestColour', function (r, g, b) {
        if (r < 100 && r > 46 && g > 90 && g < 240 && b > 190) {
          return true;
        }
         return false;
        });    
        tracking.ColorTracker.registerColor('blue', function (r, g, b) {
        if (r < 100 && r > 46 && g > 90 && g < 180 && b > 150) {
          return true;
        }
         return false;
        });
        tracking.ColorTracker.registerColor('pink', function (r, g, b) {
        if (r > 200 && g > 46 && g < 100 && b > 100 ) {
          return true;
        }
         return false;
        });
        tracking.ColorTracker.registerColor('purple', function (r, g, b) {
        if (r > 100 && r < 200 && g > 40 && g < 90 && b > 150 ) {
          return true;
        }
         return false;
        });
     
      
  
      tracker = new tracking.ColorTracker(['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple', 'bestColour' ]);

      
tracking.track('#video', tracker, { camera: true });
      
function changeColor() {
    tracker.on('track', function(event) {
      if (event.data.length === 0) {
          // No colors were detected in this frame.
      } else {
        event.data.forEach(function(rect) {
        // rect.x, rect.y, rect.height, rect.width, rect.color
        if (rect.color === "red"){
          document.documentElement.style.setProperty("--h", 0);
        } else if(rect.color === "orange"){
          document.documentElement.style.setProperty("--h", 30);
        } else if(rect.color === "yellow"){
          document.documentElement.style.setProperty("--h", 53);
        } else if (rect.color === "green"){
          document.documentElement.style.setProperty("--h", 115);
        } else if (rect.color === "blue"){
          document.documentElement.style.setProperty("--h", 200);
        } else if (rect.color === "pink"){
          document.documentElement.style.setProperty("--h", 320);
        } else if (rect.color === "purple"){
          document.documentElement.style.setProperty("--h", 257);
        } else if (rect.color === "bestColour"){
          document.documentElement.style.setProperty("--h", 165);
        }
      });
    }
  });
  requestAnimationFrame(changeColor);
}      
  requestAnimationFrame(changeColor);
};

var tongueOut = MorphSVGPlugin.pathDataToBezier("#tongue", {align:"#blob"});
var eatFly = MorphSVGPlugin.pathDataToBezier("#tongue", {align:"#fly"});
var buzz = MorphSVGPlugin.pathDataToBezier("#flypath", {align:"#fly"});



function tongue() {
var tongueOut = MorphSVGPlugin.pathDataToBezier("#tongue", {align:"#blob"});
var tongue = new TimelineMax({repeat:1, yoyo:true});
tongue.set(["#tongue", "#blob"], {autoAlpha: 1},0)
.to("#blob", 0.8, {bezier:{values:tongueOut, type:"cubic"},ease: Expo.easeIn,},0)
.from("#tongue", 0.8, {drawSVG:"0%", ease: Expo.easeIn,},0)
return tongue;
}
function nomnom(){
  var nomnom = new TimelineMax({});
  nomnom.fromTo('#chameleon', 0.5,{yPercent: 0,rotation: "0",},{yPercent: -1,rotation: "-1",transformOrigin:'50% 40%',repeat: 1, yoyo: true, ease: Back.easeInOut.config(3), delay: 0.2})
  .to('#mouth', 0.2,{ yPercent: 2, rotation: "15", transformOrigin:'0% 90%', delay: -0.5})
  .fromTo('#mouth', 0.1,{yPercent: 0,rotation: "0",},{yPercent: 5,rotation: "5",transformOrigin:'0% 90%',repeat: 15, yoyo: true,})
 .to('#mouth', 0.1,{ yPercent:0, rotation: "0", transformOrigin:'0% 90%',})
 .to('#belly', 1.5,{ scale: 1.03, ease: Expo.easeOut})
 .to('#belly', 1,{ scale: 1, ease: Expo.easeOut})
return nomnom;
}
function leaves() {
var leaves = new TimelineMax({});
leaves.staggerTo(".topleaves", 2, {rotation: "-2", transformOrigin:'90% 0%', ease: Elastic.easeOut.config(1.75, 0.5), delay: 0.8},0.2)
.to(".topleaves", 5, {rotation: "0",ease: Power0.easeNone}) 
return leaves;
}
function fly() {
var fly = new TimelineMax({});
 fly.set("#fly", {xPercent:-50, yPercent: -50})
.to("#fly", 7, {bezier:{values:buzz, type:"cubic",},ease: Power0.easeNone}) 
.to("#landingleaf", 0.8, {rotation: "-4", transformOrigin:'90% 0%', ease: Back.easeOut.config(4), delay:-0.1})
.from("#fly", 0.8, {bezier:{values:eatFly, type:"cubic",},ease: Expo.easeOut, delay: 0.8})
.to("#landingleaf", 0.8, {rotation: "0", transformOrigin:'90% 0%', ease: Back.easeOut.config(4), delay:-0.8})
.to("#fly", 0.1, {autoAlpha: 0, delay: -0.1})
return fly;
}
function wingz() {
var wingz = new TimelineMax({});
wingz.fromTo('#leftwing', 0.03,{rotation: "0", opacity: 0.8},{rotation: "40", opacity: 0.2, transformOrigin:'100% 100%',repeat: 270, yoyo: true, ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 0.2, points: 200, taper: "none", randomize:  true, clamp: false}),},0)
.fromTo('#rightwing', 0.03,{rotation: "0", opacity: 0.8},{rotation: "-40", opacity: 0.2, transformOrigin:'0% 100%',repeat: 270, yoyo: true, ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 0.2, points: 200, taper: "none", randomize:  true, clamp: false}),},0)
return wingz;
}
function eye() {
var eye = new TimelineMax({});
eye.to("#eyeball", 9, {rotation: "120", transformOrigin:'50% 50%', delay: 2})
return eye;
}

var masterTimeline = new TimelineMax({ repeat: 2, repeatDelay: 1 });
masterTimeline.set("#fly", {xPercent:-50, yPercent: -50, autoAlpha: 1})
  .set("#blob", {xPercent:-50, yPercent: -50})
  .add([fly(),wingz(),eye()],)
  .add([nomnom(),tongue(), leaves()], "-=3.31")
