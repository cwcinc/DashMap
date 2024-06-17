var zoom = 500;
var minimapRotate = true;
var minimapTranslate = true;

var ghostResolution = 1;

function drawCar(x, y) {
    let size = 5;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fill();

    size = 3;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(30, 30, 30)';
    ctx.fill();
}

function drawSquare(x, y, color, size=10, rotation=0) {

    if (rotation != 0) {
        ctx.save();
        ctx.rotate(rotation);
    }

    let halfSize = size / 2;
    ctx.beginPath();
    ctx.rect(x - halfSize, y - halfSize, size, size);

    ctx.fillStyle = color;
    ctx.fill();

    if (rotation != 0) {
        ctx.restore();
    }
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, minimap.width, minimap.height);
}

function drawStadium() {
    ctx.moveTo(...gameToCanvasCoordinates(800, 800));
    ctx.beginPath();
    ctx.lineTo(...gameToCanvasCoordinates(-800, 800));
    ctx.lineTo(...gameToCanvasCoordinates(-800, -800));
    ctx.lineTo(...gameToCanvasCoordinates(800, -800));
    ctx.lineTo(...gameToCanvasCoordinates(800, 800));
    ctx.closePath();
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.stroke();
}

// Function to draw the line
function drawGhostPath(w=false) {
    for (let a in allGhostPoints) {
        let ghostPoints = allGhostPoints[a];

        for (var i = 0; i < ghostPoints.length - ghostResolution; i += ghostResolution) {
            let point1 = gameToCanvasCoordinates(ghostPoints[i].x, ghostPoints[i].z);
            var point2 = gameToCanvasCoordinates(ghostPoints[i+ghostResolution].x, ghostPoints[i+ghostResolution].z);

            if (i == 0) {
                //drawSquare(...point1, "rgb(97,255,158)");
            }

            ctx.beginPath();
            ctx.moveTo(...point1);
            ctx.lineTo(...point2);

            let rgb;

            if (w) {rgb = [0,0,0]} else {
                let distance = distanceBetweenPoints([ghostPoints[i].x, ghostPoints[i].z], [ghostPoints[i+ghostResolution].x, ghostPoints[i+ghostResolution].z]);
                let speed = distance / (ghostPoints[i+ghostResolution].time-ghostPoints[i].time);

                let v = 1-0*(Math.pow(5, -speed));
                rgb = hsvToRgb(speed * 1.4 - 80,1,v);
            }

            ctx.strokeStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            ctx.lineWidth = zoom / 50; // Set line width
            if (w) {ctx.lineWidth = zoom / 120}
            ctx.stroke(); // Draw the line
        }
        //drawSquare(...point2, "red");
        break;
    }
}

function drawTrackPieces() {
    for (let a in allRoadPoints) {
        let roadPoint = allRoadPoints[a];
        let x = roadPoint.x;
        let z = roadPoint.z;
        let color = roadPoint.color;
        let size = roadPoint.size * zoom/30;

        let point = gameToCanvasCoordinates(x, z);

        drawSquare(...point, color, size=size);
    }
}

function distanceBetweenPoints(point1, point2) {
    var dx = point2[0] - point1[0];
    var dy = point2[1] - point1[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function gameToCanvasCoordinates(x, z) {
    let newZ = z;
    let newX = x;

    if (minimapTranslate) {
        newX -= carPose.x;
        newZ -= carPose.z;
    }
    // let newX = (x * Math.cos(minimapAngle)) - (z * Math.sin(minimapAngle));
    // let newZ = (x * Math.sin(minimapAngle)) + (z * Math.cos(minimapAngle));

    newX = (zoom)*(newX / 900);
    newZ = -(zoom)*(newZ / 900);

    return [newX, newZ];
}

function updateMinimap() {
    updatePosition();
    
    carPose = {x:posX, z:posY};

    clearCanvas();

    ctx.save();
    ctx.translate(minimap.width / 2, minimap.height / 2)

    if (minimapRotate) {
        let minimapAngle = degreesToRadians(0);
        ctx.rotate(-minimapAngle);
    }

    drawStadium();
    drawTrackPieces();
    drawGhostPath();
    drawGhostPath(true);

    if (!minimapTranslate) {
        drawCar(...gameToCanvasCoordinates(carPose.x, carPose.z));
    }

    ctx.restore();
}

var allGhostPoints;
var minimapAngle = 0;
var carPose;
var trackId;
var allRoadPoints;

async function setGhostPoints() {
    // let allGhostData = await getAllGhosts(trackId);
    let allGhostData = [await getGhost(trackId, 1)];
    let pointsList = [];
    for (let a in allGhostData) {
        let ghostData = allGhostData[a];
        let points = [];
        for (let i in ghostData) {
            let p = ghostData[i].p;
            let t = ghostData[i].t;
            points.push({x:Number(p[0]), z:Number(p[2]), time:Number(t)});
        }
        pointsList.push(points);
    }
    
    for (let i in pointsList[0]) {
        setTimeout(() => {allGhostPoints = [pointsList[0].slice(0, i+1)];}, i * 30);
    }
}

async function setRoadPoints() {
    let trackData = await getTrackData(trackId);
    let trackPieces = trackData.trackPieces;
    let environment = trackData.environmentId;

    if (environment == 0) {
        document.getElementById("minimapcanvas").style.background = 'rgba(10, 110, 40, 0.7)';
    } else if (environment == 1) {
        document.getElementById("minimapcanvas").style.background = 'rgba(10, 110, 40, 0.7)';
    } else if (environment == 2) {
        document.getElementById("minimapcanvas").style.background = 'rgba(10, 20, 110, 0.7)';
    }

    console.log("Environment: " + environment);

    let roadPoints = [];
    for (let i in trackPieces) {
        let id = trackPieces[i].id;
        let x = trackPieces[i].p[0];
        let y = trackPieces[i].p[1];
        let z = trackPieces[i].p[2];

        let pieceType = pieceIndex[id];

        let color;

        switch (pieceType) {
            case "Road":
                color = "rgba(0,0,0, 0.6)";
                break;
            case "Start":
                color = "rgb(0,255,0)";
                break;
            case "Finish":
                color = "rgb(255,0,0)";
                break;
            case "Metal":
                color = "rgba(100,100,100,0.5)";
                break;
            case "Platform":
                color = "rgba(200,200,200,0.5)";
                break;
            case "Tube":
                color = "rgba(71,221,255,0.8)";
                break;
            case "Nature":
                color = "rgba(100,255,100,0.4)";
                break;
            case "Pipe":
                color = "rgba(255,255,255,0.5)";
                break;
            case "Arrows":
                color = "rgba(200,200,100,0.5)";
        }

        roadPoints.push({x:x, y:y, z:z, size:1, color:color, type:pieceType});
    }
    roadPoints.sort(function(a, b) {
        let specialParts = ["Road", "Finish", "Start"];
        let aSpecial = specialParts.includes(a.type);
        let bSpecial = specialParts.includes(b.type);

        if (aSpecial && !bSpecial) {
            return 1;
        } else if (!aSpecial && bSpecial) {
            return -1;
        } else {
            return a.y - b.y;
        }
    });

    for (let i in roadPoints) {
        setTimeout(() => {allRoadPoints = roadPoints.slice(0, i+1);}, i * 20);
    }

    return roadPoints.length * 2;
}

async function createMap() {
    allGhostPoints = [];
    allRoadPoints = [];
    let waitTime = await setRoadPoints();
    setTimeout(setGhostPoints, Math.min(waitTime, 2000));
}

var minimap;
var ctx;

window.addEventListener('load', () => {

    document.getElementById("track-id-input").addEventListener('input', trackInput);
    
    minimap = document.getElementById('minimapcanvas');
    ctx = minimap.getContext('2d');

    function resizeCanvas() {
        minimap.width = window.innerWidth;
        minimap.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    trackId = "663910e5e52a0be7b6a4b47e";

    createMap();

    setInterval(updateMinimap);
});

window.addEventListener('wheel', function(event) {
    // Determine the scroll direction
    if (event.deltaY < 0) {
        // Scrolling up, zoom in
        zoom *= 1.04;
    } else {
        // Scrolling down, zoom out
        zoom /= 1.04;
    }

    // Clamp the zoom value to prevent it from getting too small or too large
    zoom = Math.max(350, Math.min(zoom, 10000));
});

var mapSpeed = 5;
var posX = 0;
var posY = 0

const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

function updatePosition() {
    mapSpeed = 2000 / zoom;
    
    if (keys.w) posY = Math.max(-600, Math.min(600, posY + mapSpeed));
    if (keys.s) posY = Math.max(-600, Math.min(600, posY - mapSpeed));
    if (keys.a) posX = Math.max(-600, Math.min(600, posX - mapSpeed));
    if (keys.d) posX = Math.max(-600, Math.min(600, posX + mapSpeed));
}

window.addEventListener('keydown', function(event) {
    switch (event.key.toLowerCase()) {
        case 'w':
            keys.w = true;
            break;
        case 'a':
            keys.a = true;
            break;
        case 's':
            keys.s = true;
            break;
        case 'd':
            keys.d = true;
            break;
    }
});

window.addEventListener('keyup', function(event) {
    switch (event.key.toLowerCase()) {
        case 'w':
            keys.w = false;
            break;
        case 'a':
            keys.a = false;
            break;
        case 's':
            keys.s = false;
            break;
        case 'd':
            keys.d = false;
            break;
    }
});

async function trackInput() {
    let tid = document.getElementById("track-id-input").value;
    tid = tid.replaceAll("/", "");
    tid = tid.slice(tid.length - 24);
    let resp = await fetch("https://cdn.dashcraft.io/v2/prod/track/" + tid + ".json");
    if (resp.ok) {
        trackId = tid;
        createMap();
    } else {
        console.log("not ok");
    }
}