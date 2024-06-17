function degreesToRadians(degrees) {
    return Math.PI * degrees / 180;
}

async function getGhost(trackID, place) {
  let track = await (await fetch("https://api.dashcraft.io/trackv2/" + trackID)).json();

  let ghostId = track.leaderboard[place - 1]._id;
  let ghost = await (await fetch("https://cdn.dashcraft.io/v2/prod/ghost/" + ghostId + ".json")).json();
  let ghostData = ghost.snapshots;
  return ghostData;
}

async function getTrackData(trackID) {
  let trackData = await (await fetch("https://cdn.dashcraft.io/v2/prod/track/" + trackID + ".json")).json();
  return trackData;
}

function hsvToRgb(h,s,v) 
{
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);
  return [255*f(5),255*f(3),255*f(1)];
}