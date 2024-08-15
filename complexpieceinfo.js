function drawComplexPiece(id, x, y, r, size, trans) {
    ctx.save();

    
    let sizeMult = size / 30;

    ctx.lineWidth = 4 * sizeMult;

    trans = Math.max(2 * Math.round(trans * 50), 99).toString();

    road = "#a5a5a5" + trans;
    yellow = "#ffcf00" + trans;
    blue = "#5279ff" + trans;
    white = "#ffffff" + trans;
    border = "#363636" + trans;
    finish = "#ef3533" + trans;
    platformEdge = "#dbceda" + trans;
    roadPlatform = "#e2cfdd" + trans;
    tube = "#67ffff" + (trans / 2);
    lightgrass = "#56d463" + trans;
    darkgrass = "#53cd5f" + trans;
    tree = "#1b6e32" + trans;

    ctx.translate(x, y);
    ctx.rotate(r * Math.PI / 180);

    x = 0;
    y = 0;

    if (id == 1) {
        ctx.fillStyle = road;
        ctx.fillRect(x - 15*sizeMult, y - 13*sizeMult, 30*sizeMult, 30*sizeMult);

        ctx.fillStyle = yellow;
        ctx.fillRect(x - 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult);
        ctx.fillRect(x + 7*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult);

        ctx.fillStyle = blue;
        ctx.fillRect(x - 11*sizeMult, y - 4*sizeMult, 22*sizeMult, 8*sizeMult);

        ctx.fillStyle = white;
        for (let i = 0; i < 3; i++) {
        ctx.fillRect(x - 12*sizeMult + i * 8*sizeMult, y - 4*sizeMult, 4*sizeMult, 4*sizeMult);
        ctx.fillRect(x - 8*sizeMult + i * 8*sizeMult, y, 4*sizeMult, 4*sizeMult);
        }

        ctx.fillStyle = border;
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult);
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult);
    }

    else if (id == 2) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult);

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 7*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)

        ctx.fillStyle = finish
        ctx.fillRect(x - 11*sizeMult, y - 4*sizeMult, 22*sizeMult, 8*sizeMult)
    }

    else if (id == 3 || id == 24 || id == 49) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 7*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
    }

    else if (id == 4) {
        ctx.fillStyle = road
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 30*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.lineTo(x + 15*sizeMult, y + 15*sizeMult);
        ctx.fill();

        ctx.fillStyle = border
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 4*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.lineTo(x + 15*sizeMult, y + 15*sizeMult);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 28*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 6*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 24*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()
    }

    else if (id == 6 || id == 57 || id == 58) {
        ctx.fillStyle = road
        ctx.beginPath();
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 60*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 30*sizeMult, Math.PI / 2 * 3, Math.PI, true);
        ctx.fill();

        ctx.fillStyle = border
        ctx.beginPath()
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 58*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 32*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 36*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 54*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()
    }

    else if (id == 8 || id == 52 || id == 53 || id == 75 || id == 62 || id == 79 || id == 77) {
        ctx.fillStyle = road
        ctx.beginPath();
        ctx.arc(x + 45*sizeMult, y + 45*sizeMult, 90*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.arc(x + 45*sizeMult, y + 45*sizeMult, 60*sizeMult, Math.PI / 2 * 3, Math.PI, true);
        ctx.fill();

        ctx.fillStyle = border
        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 45*sizeMult, 88*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 45*sizeMult, 62*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 45*sizeMult, 66*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 45*sizeMult, 84*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()
    }

    else if (id == 9) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = platformEdge
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 11*sizeMult, 30*sizeMult, 4*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 1*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 14*sizeMult, y - 15*sizeMult, 1*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 14*sizeMult, 30*sizeMult, 1*sizeMult)

        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 4*sizeMult)
    }

    else if (id == 10) {
        ctx.strokeStyle = road
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 30*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()
    }

    else if (id == 11) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = platformEdge
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 11*sizeMult, 30*sizeMult, 4*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 1*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 14*sizeMult, y - 15*sizeMult, 1*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 14*sizeMult, 30*sizeMult, 1*sizeMult)
    }

    else if (id == 12 || id == 71) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 2*sizeMult, 30*sizeMult, 4*sizeMult)
    }

    else if (id == 13 || id == 14) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = platformEdge
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 4*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 11*sizeMult, 30*sizeMult, 4*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 1*sizeMult, 30*sizeMult)
        ctx.fillRect(x + 14*sizeMult, y - 15*sizeMult, 1*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 14*sizeMult, 30*sizeMult, 1*sizeMult)
    }

    else if (id == 15 || id == 16) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 30*sizeMult, 45*sizeMult)

        ctx.fillStyle = platformEdge
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 30*sizeMult, 4*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 11*sizeMult, 30*sizeMult, 4*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 1*sizeMult, 45*sizeMult)
        ctx.fillRect(x + 14*sizeMult, y - 30*sizeMult, 1*sizeMult, 45*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 30*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 14*sizeMult, 30*sizeMult, 1*sizeMult)
    }

    else if (id == 17 || id == 23 || id == 25) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 30*sizeMult, 45*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 11*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)
        ctx.fillRect(x + 7*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)
    }

    else if (id == 18 || id == 61 || id == 60) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 45*sizeMult, 30*sizeMult, 90*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 45*sizeMult, 4*sizeMult, 90*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 45*sizeMult, 4*sizeMult, 90*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 11*sizeMult, y - 45*sizeMult, 4*sizeMult, 90*sizeMult)
        ctx.fillRect(x + 7*sizeMult, y - 45*sizeMult, 4*sizeMult, 90*sizeMult)
    }

    else if (id == 20 || id == 21 || id == 48 || id == 47) {
        ctx.fillStyle = white
        ctx.fillRect(x - 15*sizeMult, y - 2*sizeMult, 30*sizeMult, 4*sizeMult)
    }

    else if (id == 22) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 75*sizeMult, 30*sizeMult, 135*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 75*sizeMult, 4*sizeMult, 135*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 75*sizeMult, 4*sizeMult, 135*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 11*sizeMult, y - 75*sizeMult, 4*sizeMult, 135*sizeMult)
        ctx.fillRect(x + 7*sizeMult, y - 75*sizeMult, 4*sizeMult, 135*sizeMult)
    }

    else if (id == 26) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 4*sizeMult)

        ctx.beginPath();
        ctx.arc(x - 15*sizeMult, y + 15*sizeMult, 4*sizeMult, Math.PI / 2 * 3, 0);
        ctx.lineTo(x - 15*sizeMult, y + 15*sizeMult);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 4*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.lineTo(x + 15*sizeMult, y + 15*sizeMult);
        ctx.fill();

        ctx.strokeStyle = yellow
        ctx.fillStyle = yellow
        ctx.fillRect(x - 15*sizeMult, y - 11*sizeMult, 30*sizeMult, 4*sizeMult)

        ctx.beginPath()
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 6*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 15*sizeMult, y + 15*sizeMult, 6*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()
    }

    else if (id == 27) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = border
        ctx.beginPath();
        ctx.arc(x - 15*sizeMult, y + 15*sizeMult, 4*sizeMult, Math.PI / 2 * 3, 0);
        ctx.lineTo(x - 15*sizeMult, y + 15*sizeMult);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 4*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.lineTo(x + 15*sizeMult, y + 15*sizeMult);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 0, Math.PI / 2);
        ctx.lineTo(x - 15*sizeMult, y - 15*sizeMult);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y - 15*sizeMult, 4*sizeMult, Math.PI / 2, Math.PI);
        ctx.lineTo(x + 15*sizeMult, y - 15*sizeMult);
        ctx.fill();

        ctx.strokeStyle = yellow
        ctx.beginPath();
        ctx.arc(x - 15*sizeMult, y + 15*sizeMult, 6*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 6*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath();
        ctx.arc(x - 15*sizeMult, y - 15*sizeMult, 6*sizeMult, 0, Math.PI / 2);
        ctx.stroke()

        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y - 15*sizeMult, 6*sizeMult, Math.PI / 2, Math.PI);
        ctx.stroke()
    }

    else if (id == 28) {
        ctx.strokeStyle = border
        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 30*sizeMult, 58*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 30*sizeMult, 32*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 30*sizeMult, 58*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 30*sizeMult, 32*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 30*sizeMult, 36*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x + 45*sizeMult, y + 30*sizeMult, 54*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 30*sizeMult, 36*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 30*sizeMult, 54*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.fillStyle = road
        ctx.beginPath();
        ctx.arc(x - 45*sizeMult, y + 30*sizeMult, 52*sizeMult, Math.PI / 2 * 3, 0);
        ctx.arc(x - 45*sizeMult, y + 30*sizeMult, 38*sizeMult, 0, Math.PI / 2 * 3, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + 45*sizeMult, y + 30*sizeMult, 52*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.arc(x + 45*sizeMult, y + 30*sizeMult, 38*sizeMult, Math.PI / 2 * 3, Math.PI, true);
        ctx.fill();
    }

    else if (id == 29 || id == 37) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)
    }

    else if (id == 30) {
        ctx.fillStyle = roadPlatform
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 30*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.lineTo(x + 15*sizeMult, y + 15*sizeMult);
        ctx.fill();

        ctx.fillStyle = border
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 28*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()

        ctx.strokeStyle = blue
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y + 15*sizeMult, 24*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.stroke()
    }

    else if (id == 31) {
        ctx.fillStyle = roadPlatform
        ctx.beginPath();
        ctx.arc(x - 30*sizeMult, y - 30*sizeMult, 30*sizeMult, 0, Math.PI / 2);
        ctx.lineTo(x, y);
        ctx.fill();
        ctx.fillRect(x - 30, y, 30*sizeMult, 30*sizeMult)
        ctx.fillRect(x, y - 30*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = border
        ctx.beginPath();
        ctx.arc(x - 30*sizeMult, y - 30*sizeMult, 32*sizeMult, 0, Math.PI / 2);
        ctx.stroke()

        ctx.strokeStyle = blue
        ctx.beginPath();
        ctx.arc(x - 30*sizeMult, y - 30*sizeMult, 36*sizeMult, 0, Math.PI / 2);
        ctx.stroke()
    }

    else if (id == 32 || id == 34) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)

        ctx.fillStyle = blue
        ctx.fillRect(x - 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
    }

    else if (id == 33 || id == 35) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 30*sizeMult, 45*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)

        ctx.fillStyle = blue
        ctx.fillRect(x - 11*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)
    }

    else if (id == 36 || id == 38) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 30*sizeMult, 45*sizeMult)
    }

    else if (id == 39 || id == 41) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 30*sizeMult, 30*sizeMult, 45*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x + 11*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)

        ctx.fillStyle = blue
        ctx.fillRect(x + 7*sizeMult, y - 30*sizeMult, 4*sizeMult, 45*sizeMult)
    }

    else if (id == 40) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)

        ctx.fillStyle = blue
        ctx.fillRect(x + 7*sizeMult, y - 15*sizeMult, 4*sizeMult, 30*sizeMult)
    }

    else if (id == 42) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 15*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)
        ctx.fillRect(x + 7*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)
    }

    else if (id == 54 || id == 76 || id == 63 || id == 80 || id == 78) {
        ctx.fillStyle = road
        ctx.beginPath();
        ctx.arc(x - 45*sizeMult, y + 45*sizeMult, 90*sizeMult, Math.PI / 2 * 3, 0);
        ctx.arc(x - 45*sizeMult, y + 45*sizeMult, 60*sizeMult, 0, Math.PI / 2 * 3, true);
        ctx.fill();

        ctx.fillStyle = border
        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 45*sizeMult, 88*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 45*sizeMult, 62*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 45*sizeMult, 66*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 45*sizeMult, y + 45*sizeMult, 84*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()
    }

    else if (id == 59) {
        ctx.fillStyle = road
        ctx.beginPath();
        ctx.arc(x - 30*sizeMult, y + 30*sizeMult, 60*sizeMult, Math.PI / 2 * 3, 0);
        ctx.arc(x - 30*sizeMult, y + 30*sizeMult, 30*sizeMult, 0, Math.PI / 2 * 3, true);
        ctx.fill();

        ctx.fillStyle = border
        ctx.beginPath()
        ctx.arc(x - 30*sizeMult, y + 30*sizeMult, 58*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 30*sizeMult, y + 30*sizeMult, 32*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        ctx.arc(x - 30*sizeMult, y + 30*sizeMult, 36*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x - 30*sizeMult, y + 30*sizeMult, 54*sizeMult, Math.PI / 2 * 3, 0);
        ctx.stroke()
    }

    else if (id == 64) {
        ctx.fillStyle = road
        ctx.beginPath();
        sineWave(x - 15*sizeMult, y + 15*sizeMult, 15*sizeMult, 30*sizeMult, true)
        ctx.lineTo(x + 15*sizeMult, y + 15*sizeMult)
        sineWave(x + 15*sizeMult, y + 15*sizeMult, 15*sizeMult, 30*sizeMult, true)
        ctx.lineTo(x, y - 15*sizeMult)
        ctx.fill()

        ctx.strokeStyle = border
        ctx.beginPath();
        sineWave(x - 13*sizeMult, y + 15*sizeMult, 15*sizeMult, 30*sizeMult, true)
        ctx.stroke()

        ctx.beginPath();
        sineWave(x + 13*sizeMult, y + 15*sizeMult, 15*sizeMult, 30*sizeMult, true)
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath();
        sineWave(x - 9*sizeMult, y + 15*sizeMult, 15*sizeMult, 30*sizeMult, true)
        ctx.stroke()

        ctx.beginPath();
        sineWave(x + 9*sizeMult, y + 15*sizeMult, 15*sizeMult, 30*sizeMult, true)
        ctx.stroke()
    }

    else if (id == 65) {
        ctx.fillStyle = road
        ctx.beginPath();
        sineWave(x - 30*sizeMult, y - 15*sizeMult, 15*sizeMult, 30*sizeMult, false)
        ctx.lineTo(x, y - 15*sizeMult)
        sineWave(x, y - 15*sizeMult, 15*sizeMult, 30*sizeMult, false)
        ctx.lineTo(x - 15*sizeMult, y + 15*sizeMult)
        ctx.fill()

        ctx.strokeStyle = border
        ctx.beginPath();
        sineWave(x - 28*sizeMult, y - 15*sizeMult, 15*sizeMult, 30*sizeMult, false)
        ctx.stroke()

        ctx.beginPath();
        sineWave(x - 2*sizeMult, y - 15*sizeMult, 15*sizeMult, 30*sizeMult, false)
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath();
        sineWave(x - 24*sizeMult, y - 15*sizeMult, 15*sizeMult, 30*sizeMult, false)
        ctx.stroke()

        ctx.beginPath();
        sineWave(x - 6*sizeMult, y - 15*sizeMult, 15*sizeMult, 30*sizeMult, false)
        ctx.stroke()
    }

    else if (id == 66) {
        ctx.fillStyle = road
        ctx.beginPath()
        sineWave(x - 30*sizeMult, y + 30*sizeMult, 30*sizeMult, 60*sizeMult, true)
        ctx.lineTo(x + 30*sizeMult, y - 30*sizeMult)
        sineWave(x, y + 30*sizeMult, 30*sizeMult, 60*sizeMult, true)
        ctx.lineTo(x - 30*sizeMult, y + 30*sizeMult)
        ctx.fill()

        ctx.strokeStyle = border
        ctx.beginPath()
        sineWave(x - 28*sizeMult, y + 30*sizeMult, 30*sizeMult, 60*sizeMult, true)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 2*sizeMult, y + 30*sizeMult, 30*sizeMult, 60*sizeMult, true)
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        sineWave(x - 24*sizeMult, y + 30*sizeMult, 30*sizeMult, 60*sizeMult, true)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 6*sizeMult, y + 30*sizeMult, 30*sizeMult, 60*sizeMult, true)
        ctx.stroke()
    }

    else if (id == 67) {
        ctx.fillStyle = road
        ctx.beginPath()
        sineWave(x - 30*sizeMult, y - 30*sizeMult, 30*sizeMult, 60*sizeMult)
        ctx.lineTo(x + 30*sizeMult, y + 30*sizeMult)
        sineWave(x, y - 30*sizeMult, 30*sizeMult, 60*sizeMult)
        ctx.lineTo(x - 30*sizeMult, y - 30*sizeMult)
        ctx.fill()

        ctx.strokeStyle = border
        ctx.beginPath()
        sineWave(x - 28*sizeMult, y - 30*sizeMult, 30*sizeMult, 60*sizeMult)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 2*sizeMult, y - 30*sizeMult, 30*sizeMult, 60*sizeMult)
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        sineWave(x - 24*sizeMult, y - 30*sizeMult, 30*sizeMult, 60*sizeMult)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 6*sizeMult, y - 30*sizeMult, 30*sizeMult, 60*sizeMult)
        ctx.stroke()
    }

    else if (id == 68) {
        ctx.fillStyle = road
        ctx.beginPath()
        sineWave(x - 45*sizeMult, y + 45*sizeMult, 60*sizeMult, 90*sizeMult, true)
        ctx.lineTo(x + 45*sizeMult, y - 45*sizeMult)
        sineWave(x - 15*sizeMult, y + 45*sizeMult, 60*sizeMult, 90*sizeMult, true)
        ctx.lineTo(x - 45*sizeMult, y + 45*sizeMult)
        ctx.fill()

        ctx.strokeStyle = border
        ctx.beginPath()
        sineWave(x - 43*sizeMult, y + 45*sizeMult, 60*sizeMult, 90*sizeMult, true)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 17*sizeMult, y + 45*sizeMult, 60*sizeMult, 90*sizeMult, true)
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        sineWave(x - 39*sizeMult, y + 45*sizeMult, 60*sizeMult, 90*sizeMult, true)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 21*sizeMult, y + 45*sizeMult, 60*sizeMult, 90*sizeMult, true)
        ctx.stroke()
    }

    else if (id == 69) {
        ctx.fillStyle = road
        ctx.beginPath()
        sineWave(x - 45*sizeMult, y - 45*sizeMult, 60*sizeMult, 90*sizeMult)
        ctx.lineTo(x + 45*sizeMult, y + 45*sizeMult)
        sineWave(x - 15*sizeMult, y - 45*sizeMult, 60*sizeMult, 90*sizeMult)
        ctx.lineTo(x - 45*sizeMult, y - 45*sizeMult)
        ctx.fill()

        ctx.strokeStyle = border
        ctx.beginPath()
        sineWave(x - 43*sizeMult, y - 45*sizeMult, 60*sizeMult, 90*sizeMult)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 17*sizeMult, y - 45*sizeMult, 60*sizeMult, 90*sizeMult)
        ctx.stroke()

        ctx.strokeStyle = yellow
        ctx.beginPath()
        sineWave(x - 39*sizeMult, y - 45*sizeMult, 60*sizeMult, 90*sizeMult)
        ctx.stroke()
        ctx.beginPath()
        sineWave(x - 21*sizeMult, y - 45*sizeMult, 60*sizeMult, 90*sizeMult)
        ctx.stroke()
    }

    else if (id == 70 || id == 43) {
        ctx.fillStyle = road
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 15*sizeMult)

        ctx.fillStyle = platformEdge
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)
        ctx.fillRect(x + 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 4*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 4*sizeMult, 30*sizeMult, 4*sizeMult)

        ctx.fillStyle = yellow
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 1*sizeMult, 15*sizeMult)
        ctx.fillRect(x + 14*sizeMult, y - 15*sizeMult, 1*sizeMult, 15*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 1*sizeMult, 30*sizeMult, 1*sizeMult)
    }

    else if (id == 72) {
        ctx.fillStyle = platformEdge
        ctx.fillRect(x, y - 2*sizeMult, 15*sizeMult, 4*sizeMult)
    }

    else if (id == 73) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 15*sizeMult)
    }

    else if (id == 74) {
        ctx.fillStyle = roadPlatform
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 15*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)

        ctx.fillStyle = blue
        ctx.fillRect(x - 11*sizeMult, y - 15*sizeMult, 4*sizeMult, 15*sizeMult)
    }

    else if (id == 81) {
        ctx.fillStyle = white
        ctx.fillRect(x - 3, y - 15, 6, 30*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 3*sizeMult, y - 15*sizeMult, 6*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 3*sizeMult, y + 14*sizeMult, 6*sizeMult, 1*sizeMult)
    }

    else if (id == 82 || id == 90) {
        ctx.fillStyle = white
        ctx.fillRect(x - 3*sizeMult, y - 15*sizeMult, 6*sizeMult, 15*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 3*sizeMult, y - 15*sizeMult, 6*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 3*sizeMult, y - 1*sizeMult, 6*sizeMult, 1*sizeMult)
    }

    else if (id == 83 || id == 84) {
        ctx.fillStyle = border
        ctx.beginPath()
        ctx.arc(x, y, 3.5*sizeMult, 0, Math.PI * 2)
        ctx.fill()
    }

    else if (id == 85) {
        ctx.fillStyle = white
        ctx.beginPath();
        ctx.arc(x + 15*sizeMult, y, 12*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.arc(x + 15*sizeMult, y, 18*sizeMult, Math.PI / 2 * 3, Math.PI, true);
        ctx.fill();

        ctx.fillStyle = border
        ctx.fillRect(x - 3*sizeMult, y, 6*sizeMult, 1*sizeMult)
        ctx.fillRect(x + 14*sizeMult, y - 18*sizeMult, 1*sizeMult, 6*sizeMult)
    }

    else if (id == 86) {
        ctx.fillStyle = white
        ctx.beginPath()
        ctx.arc(x, y, 3.5*sizeMult, 0, Math.PI)
        ctx.lineTo(x - 3*sizeMult, y - 15*sizeMult)
        ctx.lineTo(x + 3*sizeMult, y - 15*sizeMult)
        ctx.fill()

        ctx.fillStyle = border
        ctx.fillRect(x - 3*sizeMult, y - 15*sizeMult, 6*sizeMult, 1*sizeMult)
    }

    else if (id == 87) {
        ctx.fillStyle = white
        ctx.fillRect(x - 3*sizeMult, y - 15*sizeMult, 6*sizeMult, 15*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 3*sizeMult, y - 1*sizeMult, 6*sizeMult, 1*sizeMult)
        ctx.beginPath()
        ctx.arc(x, y - 15*sizeMult, 3.5*sizeMult, 0, Math.PI * 2)
        ctx.fill()
    }

    else if (id == 88) {
        ctx.fillStyle = white
        ctx.fillRect(x - 3*sizeMult, y - 15*sizeMult, 6*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 3*sizeMult, 30*sizeMult, 6*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 3*sizeMult, y - 15*sizeMult, 6*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 3*sizeMult, y + 14*sizeMult, 6*sizeMult, 1*sizeMult)
        ctx.fillRect(x + 14*sizeMult, y - 3*sizeMult, 1*sizeMult, 6*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 3*sizeMult, 1*sizeMult, 6*sizeMult)

        ctx.fillRect(x - 3*sizeMult, y - 3*sizeMult, 6*sizeMult, 6*sizeMult)
    }

    else if (id == 89) {
        ctx.fillStyle = white
        ctx.fillRect(x - 15*sizeMult, y - 3*sizeMult, 30*sizeMult, 6*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x + 14*sizeMult, y - 3*sizeMult, 1*sizeMult, 6*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 3*sizeMult, 1*sizeMult, 6*sizeMult)

        ctx.beginPath()
        ctx.arc(x, y, 3.5*sizeMult, 0, Math.PI * 2)
        ctx.fill()
    }

    else if (id == 91) {
        ctx.fillStyle = tube
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y + 13*sizeMult, 30*sizeMult, 1*sizeMult)
    }

    else if (id == 92) {
        ctx.fillStyle = tube
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 15*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 15*sizeMult)

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 1*sizeMult)
        ctx.fillRect(x - 15*sizeMult, y - 1*sizeMult, 30*sizeMult, 1*sizeMult)
    }

    else if (id == 93 || id == 94) {
        ctx.lineWidth = 1*sizeMult
        ctx.strokeStyle = border
        ctx.beginPath()
        ctx.arc(x, y, 14*sizeMult, 0, Math.PI * 2)
        ctx.stroke()
    }

    else if (id == 95) {
        ctx.fillStyle = tube
        ctx.beginPath();
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 60*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 30*sizeMult, Math.PI / 2 * 3, Math.PI, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 60*sizeMult, Math.PI, Math.PI / 2 * 3);
        ctx.arc(x + 30*sizeMult, y + 30*sizeMult, 30*sizeMult, Math.PI / 2 * 3, Math.PI, true);
        ctx.fill();

        ctx.fillStyle = border
        ctx.fillRect(x - 30*sizeMult, y + 29*sizeMult, 30*sizeMult, 1*sizeMult)
        ctx.fillRect(x + 30*sizeMult, y - 30*sizeMult, 1*sizeMult, 30*sizeMult)
    }

    else if (id == 96) {
        ctx.strokeStyle = border
        ctx.lineWidth = 1*sizeMult
        ctx.beginPath();
        ctx.arc(x, y, 14*sizeMult, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = tube
        ctx.beginPath();
        ctx.arc(x, y, 15*sizeMult, Math.PI, 0)
        ctx.lineTo(x + 15*sizeMult, y - 45*sizeMult)
        ctx.lineTo(x - 15*sizeMult, y - 45*sizeMult)
        ctx.fill()

        ctx.beginPath();
        ctx.arc(x, y, 15*sizeMult, 0, Math.PI)
        ctx.lineTo(x - 15*sizeMult, y - 45*sizeMult)
        ctx.lineTo(x + 15*sizeMult, y - 45*sizeMult)
        ctx.fill()

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 45*sizeMult, 30*sizeMult, 1*sizeMult)
    }

    else if (id == 97) {
        ctx.fillStyle = tube
        ctx.beginPath();
        ctx.arc(x, y, 15*sizeMult, Math.PI, 0)
        ctx.lineTo(x + 15*sizeMult, y - 45*sizeMult)
        ctx.lineTo(x - 15*sizeMult, y - 45*sizeMult)
        ctx.fill()

        ctx.beginPath();
        ctx.arc(x, y, 15*sizeMult, 0, Math.PI)
        ctx.lineTo(x - 15*sizeMult, y - 45*sizeMult)
        ctx.lineTo(x + 15*sizeMult, y - 45*sizeMult)
        ctx.fill()

        ctx.fillStyle = border
        ctx.fillRect(x - 15*sizeMult, y - 45*sizeMult, 30*sizeMult, 1*sizeMult)

        ctx.strokeStyle = border
        ctx.lineWidth = 1*sizeMult
        ctx.beginPath();
        ctx.arc(x, y, 14*sizeMult, 0, Math.PI * 2)
        ctx.stroke()
    }

    else if (id == 98) {
        ctx.fillStyle = lightgrass
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 30*sizeMult, 30*sizeMult)

        ctx.fillStyle = darkgrass
        ctx.fillRect(x - 15*sizeMult, y - 15*sizeMult, 15*sizeMult, 15*sizeMult)
        ctx.fillRect(x, y, 15*sizeMult, 15*sizeMult)
    }

    else if (id == 101) {
        ctx.fillStyle = tree
        ctx.fillRect(x - 11*sizeMult, y - 11*sizeMult, 7*sizeMult, 7*sizeMult)
        ctx.fillRect(x - 11*sizeMult, y + 4*sizeMult, 7*sizeMult, 7*sizeMult)
        ctx.fillRect(x + 4*sizeMult, y - 11*sizeMult, 7*sizeMult, 7*sizeMult)
        ctx.fillRect(x + 4*sizeMult, y + 4*sizeMult, 7*sizeMult, 7*sizeMult)
    }

    else if (id == 103) {
        ctx.fillStyle = tree
        ctx.fillRect(x + 4*sizeMult, y - 11*sizeMult, 7*sizeMult, 7*sizeMult)
    }

    else {
        ctx.fillStyle = road
        //ctx.fillRect(x - 15, y - 15, 30, 30)
    }
    ctx.restore()
}

function sineWave(x, y, width, height, invert) {
  ctx.moveTo(x, y)
  for (let i = 0; i < height; i++) {
    if (invert) {
      ctx.lineTo(x + Math.sin((i - height / 2) * Math.PI / height) * width / 2 + width / 2, y - i)
    } else {
      ctx.lineTo(x + Math.sin((i - height / 2) * Math.PI / height) * width / 2 + width / 2, y + i)
    }
  }
}