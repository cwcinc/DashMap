var zoom = 300;
var minimapRotate = true;
var minimapTranslate = true;

var ghostResolution = 1;

var colorRacers = true;
var showSpeedColor = false;

var followTopCar = false;

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
function drawGhostPath() {
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
            if (selectedGhost != null && a == 0) {
                let distance = distanceBetweenPoints([ghostPoints[i].x, ghostPoints[i].z], [ghostPoints[i+ghostResolution].x, ghostPoints[i+ghostResolution].z]);
                let speed = distance / (ghostPoints[i+ghostResolution].time-ghostPoints[i].time);

                rgb = hsvToRgb(100 * Math.pow(speed, 0.4) - 80,1,0.4 + Math.pow(speed, 2) / 1000);

                ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.5)';
                ctx.lineWidth = 12;
                ctx.stroke();

                ctx.strokeStyle = 'rgba(0,0,0,0.8)';
                ctx.lineWidth = 6;
                ctx.stroke();
            }
            
            if (selectedGhost == null) {
                rgb = hsvToRgb(30*a, 1, 1);
            } else if (a == 0) {
                rgb = hsvToRgb(30*selectedGhost, 1, 1);
            } else {
                rgb = hsvToRgb(30*a, 0.2, 0.6);
            }

            ctx.strokeStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.75)';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
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
    
    drawGhostPath();

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

    let fastestTime = newPointsList[0][newPointsList[0].length - 1].time;
    
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
                    // let t = Math.pow(1 - (ghostTime / fastestTime), 2);
                    // ghostResolution = Math.floor(1 + 30*t);
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

        let color = getPieceColor(pieceType, y);

        roadPoints.push({x:x, y:y, z:z, size:1, color:color, type:pieceType});
    }

    const sortByY = false;
    
    roadPoints.sort(function(a, b) {
        let specialParts = ["Finish", "Start"];
        let aSpecial = specialParts.includes(a.type);
        let bSpecial = specialParts.includes(b.type);

        if (aSpecial && !bSpecial) {
            return 1;
        } else if (!aSpecial && bSpecial) {
            return -1;
        } else {
            return sortByY ? a.y - b.y : 0;
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
                return a.y - b.y;
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

async function loadStartTrack() {
    let params = new URL(document.location).searchParams;
    let trackIDParam = params.get("trackid");

    if (trackIDParam != null) {
        trackIDParam = extractTrackId(trackIDParam);
        console.log("Loading track: ", trackIDParam);
        
        let exists = await trackExists(trackIDParam);
        if (exists) {
            trackId = trackIDParam;
        } else {
            console.log("Track param invalid");
            trackId = "667a6f295b98a760eb1bd2b2";
        }
    } else {
        trackId = demoTracks[Math.floor(Math.random() * demoTracks.length)];

        console.log("Loading demo: ", trackId);
    }

    createMap();

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

    document.getElementById("speed-select").addEventListener('input', () => {
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

    loadStartTrack();
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
    let idInput = document.getElementById("track-id-input");
    let tid = extractTrackId(idInput.value);
    let exists = await trackExists(tid);
    if (exists) {
        trackId = tid;
        idInput.value = trackId;
        idInput.blur();
        createMap();
    } else {
        console.log("Not a valid track");
    }
}