function degreesToRadians(degrees) {
    return Math.PI * degrees / 180;
}

async function getGhost(trackID, place) {
  let track = await (await fetch("https://api.dashcraft.io/trackv2/" + trackID)).json();

  if (track.leaderboard.length < place) {
    return false;
  }

  let ghostId = track.leaderboard[place - 1]._id;
  let ghost = await (await fetch("https://cdn.dashcraft.io/v2/prod/ghost/" + ghostId + ".json")).json();
  let ghostData = ghost.snapshots;
  return ghostData;
}

var version = 5;
async function getTrackData(trackID) {
  let trackData = await (await fetch("https://cdn.dashcraft.io/v2/prod/track/" + trackID + ".json?v=" + version.toString())).json();
  return trackData;
}

async function getTrackInfo(trackID) {
  let data = await fetch("https://api.dashcraft.io/trackv2/" + trackID + "?supportsLaps1=true", {
    headers: {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM0NmMzNGExYmEyMjQyNGYyZTAwMzIiLCJpbnRlbnQiOiJvQXV0aCIsImlhdCI6MTcwNzM3MTU3Mn0.0JVw6gJhs4R7bQGjr8cKGLE7CLAGvyuMiee7yvpsrWg'
    }});
  data = await data.json();
  return data;
}

async function getLeaderboard(trackID, places=10) {
  let data = await getTrackInfo(trackID);
  let leaderboard = data.leaderboard;
  return leaderboard.slice(0, places);
}

function hsvToRgb(h,s,v) 
{
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);
  return [255*f(5),255*f(3),255*f(1)];
}

function interpolateGhostData(ghostData, mult) {
    // console.log(ghostData);
    var finalData = [];
    for (let i = 0; i < ghostData.length; i++) {
        if (i == ghostData.length - 1) {
            finalData.push(ghostData[i]);
            return finalData;
        }
        var thisEntry = ghostData[i];
        var nextEntry = ghostData[i+1];

        // console.log("this: ", thisEntry);
        // console.log("next: ", nextEntry);
        // console.log("i: ", i);

        for (let n = 0; n < mult; n++) {
            let portion = n / mult; // 0 is all this entry, 0.5 is halfway this and next
            let portionI = 1 - portion;

            let mixedEntry = {
                x: (portionI * thisEntry.x + portion * nextEntry.x).toString(), 
                y: (portionI * thisEntry.y + portion * nextEntry.y).toString(),
                z: (portionI * thisEntry.z + portion * nextEntry.z).toString(),
                time: portionI * thisEntry.time + portion * nextEntry.time
            }

            finalData.push(mixedEntry);
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function trackExists(trackID) {
    let resp = await fetch("https://cdn.dashcraft.io/v2/prod/track/" + trackID + ".json");
    return resp.ok
}

function extractTrackId(trackLink) {
    let tid = trackLink.toLowerCase().replace(/[^a-f0-9]/g, '');
    tid = tid.slice(tid.length - 24);
    return tid;
}

async function getRandomTrackId(global=true) {
    const sortByPieceCount = document.getElementById("sort-random").checked;
    let page;

    if (!global) {
        page = Math.floor(Math.random() * 2);
    } else {
        page = Math.floor(Math.random() * 180);
    }
    console.log("page", page);
    let result = await fetch(`https://api.dashcraft.io/trackv2/global3?sort=recommended&verifiedOnly=${JSON.stringify(!global)}&page=${page}&pageSize=50`);
    result = await result.json();

    let result2;
    
    if (sortByPieceCount) {
        let promiseArr = [];
        for (let track in result.tracks) {
            promiseArr.push(getTrackData(result.tracks[track]._id));
        }
        let promiseResult = await Promise.all(promiseArr);

        
        result2 = promiseResult.sort(function(a, b) {
            return b.trackPieces.length - a.trackPieces.length;
        })[0];
    } else {
        result2 = randomElement(result.tracks);
    }
    return result2._id;
}

function randomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}