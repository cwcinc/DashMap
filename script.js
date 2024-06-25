var zoom = 300;
var minimapRotate = true;
var minimapTranslate = true;

var ghostResolution = 1;

var colorRacers = true;
var showSpeedColor = false;

var followTopCar = false;

const demoTracks = [
    "663910e5e52a0be7b6a4b47e",
    "6643d569e52a0be7b6e44c06",
    "66401a36e52a0be7b6c8d7cc",
    "663ac13ae52a0be7b6ad5141",
    "665190ba59adfc382f74ee39",
    "664d47a059adfc382f645820"
]

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
    ctx.moveTo(...gameToCanvasCoordinates(900, 900));
    ctx.beginPath();
    ctx.lineTo(...gameToCanvasCoordinates(-900, 900));
    ctx.lineTo(...gameToCanvasCoordinates(-900, -900));
    ctx.lineTo(...gameToCanvasCoordinates(900, -900));
    ctx.lineTo(...gameToCanvasCoordinates(900, 900));
    ctx.closePath();
    ctx.lineWidth = zoom / 60;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fill();
}

// Function to draw the line
function drawGhostPath(w=false) {
    let AGP2;
    if (selectedGhost == null) {
        AGP2 = allGhostPoints;
    } else {
        AGP2 = [allGhostPoints[selectedGhost], ...allGhostPoints.slice(0, selectedGhost), ...allGhostPoints.slice(selectedGhost + 1)];
    }
    
    
    for (let a = AGP2.length - 1; a >= 0; a--) {
        let ghostPoints = AGP2[a];

        for (var i = 0; i < ghostPoints.length - ghostResolution; i += ghostResolution) {
            let point1 = gameToCanvasCoordinates(ghostPoints[i].x, ghostPoints[i].z);
            var point2 = gameToCanvasCoordinates(ghostPoints[i+ghostResolution].x, ghostPoints[i+ghostResolution].z);

            ctx.beginPath();
            ctx.moveTo(...point1);
            ctx.lineTo(...point2);

            let rgb;

            if (w) {
                rgb = [0,0,0];
                if (colorRacers) {
                    if (selectedGhost == null) {
                        rgb = hsvToRgb(30*a, 1, 1);
                    } else if (a == 0) {
                        rgb = hsvToRgb(30*selectedGhost, 1, 1);
                    } else {
                        rgb = hsvToRgb(30*a, 0.2, 0.6);
                    }
                }
            } else {
                if (a != 0) {
                    break;
                }
                
                let distance = distanceBetweenPoints([ghostPoints[i].x, ghostPoints[i].z], [ghostPoints[i+ghostResolution].x, ghostPoints[i+ghostResolution].z]);
                let speed = distance / (ghostPoints[i+ghostResolution].time-ghostPoints[i].time);

                let v = 1-0*(Math.pow(5, -speed));
                rgb = hsvToRgb(speed * 1.4 - 80,1,v);
                // let V = speed * 2;
                // rgb = [V, V, V];
            }

            ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.75)';
            ctx.lineWidth = 9; // Set line width
            if (w) {ctx.lineWidth = 3}
            ctx.stroke(); // Draw the line
        }
        //drawSquare(...point2, "red");
        //break;
    }
}

function drawTrackPieces() {
    for (let a in allRoadPoints) {
        let roadPoint = allRoadPoints[a];
        let x = roadPoint.x;
        let z = roadPoint.z;
        let color = roadPoint.color;
        let size = roadPoint.size * zoom/29.9;

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

function updateTimer() {
    document.getElementById("timer").innerHTML =  (Math.round(ghostTime * 100) / 100) + "s";
}

function updateMinimap(dt) {
    updatePosition(dt);
    updateTimer();
    
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
    if (showSpeedColor) drawGhostPath();
    
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

var ghostTimeouts = [];

var ghostTime = 0;

var currentLB = [];

async function setGhostPoints(ghostCount, delayTime=0) {
    let startTime = Date.now() + delayTime;
    
    let allGhostData = [];
    for (i=1; i<=ghostCount; i++) {
        let thisGhost = await getGhost(trackId, i);
        if (thisGhost == false) {
            break;
        }
        allGhostData.push(thisGhost);
    }
    let waiting = startTime - Date.now();

    if (waiting > 0) {
        await delay(waiting);
    }
    
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

    allGhostPoints = [];
    for (let t in ghostTimeouts) {
        clearTimeout(ghostTimeouts[t]);
    }

    pointsList.sort(function(a, b) {
        return a.length - b.length;
    });

    let playSpeed = parseFloat(document.getElementById("speed-select").value);
    
    let newPointsList = pointsList.map((x) => interpolateGhostData(x, (playSpeed <= 1 ? 10 : 1)));
    
    for (let a in newPointsList) {
        for (let i in newPointsList[a]) {
            ghostTimeouts.push(setTimeout(() => {
                allGhostPoints[a] = newPointsList[a].slice(0, i);
                
                let cPose = newPointsList[a][i];
                if (a == 0 && followTopCar) {
                    posX = cPose.x;
                    posY = cPose.z;
                }
                
                if (i == newPointsList[a].length - 1) {
                    allGhostPoints[a] = pointsList[a];
                }

                if (a == 0) {
                    ghostTime = cPose.time;
                }
            }, i * 100 / ((playSpeed <= 1 ? 10: 1) * playSpeed)));
        }
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
                color = "rgba(71,221,255,0.5)";
                break;
            case "Nature":
                color = "rgba(100,255,100,0.3)";
                break;
            case "Pipe":
                color = "rgba(255,255,255,0.5)";
                break;
            case "Arrows":
                color = "rgba(200,200,100,0.5)";
        }

        roadPoints.push({x:x, y:y, z:z, size:1, color:color, type:pieceType});
    }

    const sortByY = true;
    
    roadPoints.sort(function(a, b) {
        let specialParts = ["Finish", "Start"];
        let aSpecial = specialParts.includes(a.type);
        let bSpecial = specialParts.includes(b.type);

        if (aSpecial && !bSpecial) {
            return 1;
        } else if (!aSpecial && bSpecial) {
            return -1;
        } else {
            return sortByY ? b.y - a.y : 0;
        }
    });

    const loadTime = 3000;
    let indivTime = loadTime / roadPoints.length;

    for (let i in roadPoints) {
        setTimeout(() => {allRoadPoints = roadPoints.slice(0, i)}, i * indivTime);
    }

    setTimeout(() => {
        allRoadPoints = roadPoints.toSorted(function(a, b) {
            let specialParts = ["Finish", "Start"];
            let aSpecial = specialParts.includes(a.type);
            let bSpecial = specialParts.includes(b.type);

            if (aSpecial && !bSpecial) {
                return 1;
            } else if (!aSpecial && bSpecial) {
                return -1;
            } else {
                return b.y - a.y;
            }
        });
    }, loadTime + 100);

    return loadTime;
}

function handleGhostClick(ghostIndex) {
    let info = topLB[ghostIndex];
    let place = parseInt(info.place);
    let time = parseFloat(info.time);
    let name = info.user.username;
    let userID = info.user._id;

    if (ghostIndex == selectedGhost) {
        selectedGhost = null;
    } else {
        selectedGhost = parseInt(ghostIndex);
    }

    let lbDivList = document.getElementById("leaderboard").getElementsByTagName("div");

    Array.from(lbDivList).forEach(child => {
        let gIndex = parseInt(child.getAttribute("ghost-number"));
        let rgb;
        let borderColor = 'black';

        if (selectedGhost == null) {
            rgb = hsvToRgb(30*gIndex, 1, 1);
        } else if (gIndex == ghostIndex) {
            rgb = hsvToRgb(30*selectedGhost, 1, 1);
            borderColor = 'white';
        } else {
            rgb = hsvToRgb(30*gIndex, 0.2, 0.6);
        }
        child.style.backgroundColor = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0.5)";
        child.style.outlineColor = borderColor;
    });
}

var topLB;
var selectedGhost = null;
async function updateLeaderboard() {
    
    let lbDiv = document.getElementById("leaderboard");
    lbDiv.classList.remove('active');

    let menuBar = document.getElementById("top-bar");
    menuBar.classList.remove('leaderboard-enabled');

    let ghostCount = parseInt(document.getElementById("ghost-count").value);
    topLB = await getLeaderboard(trackId, ghostCount);

    lbDiv.innerHTML = "";

    for (let i in topLB) {
        let color = hsvToRgb(30*i, 1, 1);
        let name = topLB[i].user.username;

        
        let newDiv = document.createElement("div");
        newDiv.setAttribute("ghost-number", i.toString());
        // newDiv.style.width = (100 / ghostCount) + "%";
        newDiv.style.backgroundColor = "rgba(" + color[0] + "," + color[1] + "," + color[2] + ",0.5)";
        newDiv.style.outlineColor = 'black';
        newDiv.classList = "name-box";
        let nameDiv = document.createElement("p");
        nameDiv.innerHTML = name;
        newDiv.appendChild(nameDiv);
        lbDiv.appendChild(newDiv);
    }

    lbDiv.classList.add('active');
    menuBar.classList.add('leaderboard-enabled');
    
    let lbDivList = document.getElementById("leaderboard").getElementsByTagName("div");

    Array.from(lbDivList).forEach(child => {
        child.addEventListener('click', (event) => {
            const divElement = event.target.closest('.name-box');
            if (divElement) {
                const divIndex = divElement.getAttribute('ghost-number');
                handleGhostClick(divIndex);
            } else {console.log("idk")}
        });
    });
}

async function createMap() {
    updateLeaderboard();
    
    allGhostPoints = [];
    for (let t in ghostTimeouts) {
        clearTimeout(ghostTimeouts[t]);
    }
    
    allRoadPoints = [];
    let waitTime = await setRoadPoints();
    
    let ghostCount = parseInt(document.getElementById("ghost-count").value);
    setGhostPoints(ghostCount, waitTime);
}

var lastTime = 0;

function updateLoop(time) {
    let dt = (time - lastTime);
    lastTime = time;
    
    updateMinimap(dt);
    requestAnimationFrame(updateLoop);
}

var minimap;
var ctx;

window.addEventListener('load', () => {

    document.getElementById("track-id-input").addEventListener('input', trackInput);

    document.getElementById("ghost-count").addEventListener('input', () => {
        let ghostCount = parseInt(document.getElementById("ghost-count").value);
        setGhostPoints(ghostCount);
    });
    
    minimap = document.getElementById('minimapcanvas');
    ctx = minimap.getContext('2d');

    function resizeCanvas() {
        minimap.width = window.innerWidth;
        minimap.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    trackId = demoTracks[Math.floor(Math.random() * demoTracks.length)];

    createMap();

    requestAnimationFrame(updateLoop);
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
    zoom = Math.max(300, Math.min(zoom, 50000));
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

function updatePosition(dt) {
    mapSpeed = parseFloat(dt * 500 / zoom);
    posX = parseFloat(posX);
    posY = parseFloat(posY);

    let maxMove = 1000 + (500000 / (-200 - zoom));
    
    if (keys.w) posY = Math.max(-maxMove, Math.min(maxMove, posY + mapSpeed));
    if (keys.s) posY = Math.max(-maxMove, Math.min(maxMove, posY - mapSpeed));
    if (keys.a) posX = Math.max(-maxMove, Math.min(maxMove, posX - mapSpeed));
    if (keys.d) posX = Math.max(-maxMove, Math.min(maxMove, posX + mapSpeed));
}

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