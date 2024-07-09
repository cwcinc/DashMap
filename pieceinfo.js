const pieceIndex = {
    3: "Road",
    42: "Road",
    1: "Start",
    2: "Finish",

    4: "Road",
    6: "Road",
    8: "Road",
    59: "Road",
    58: "Road",
    54: "Road",
    53: "Road",
    26: "Road",
    27: "Road",
    28: "Road",

    65: "Road",
    64: "Road",
    67: "Road",
    66: "Road",
    69: "Road",
    68: "Road",

    17: "Road",
    18: "Road",
    22: "Road",
    23: "Road",
    24: "Road",
    25: "Road",
    76: "Road",
    26: "Road",

    13: "Metal",
    70: "Metal",
    12: "Metal",
    71: "Metal",
    72: "Metal",
    15: "Metal",
    14: "Metal",
    16: "Metal",
    9: "Metal",
    10: "Metal",
    11: "Metal",

    32: "Platform",
    74: "Platform",
    29: "Platform",
    73: "Platform",
    30: "Platform",
    31: "Platform",
    33: "Platform",
    36: "Platform",
    39: "Platform",
    34: "Platform",
    37: "Platform",
    40: "Platform",
    35: "Platform",
    38: "Platform",
    41: "Platform",

    49: "Road",
    61: "Road",
    60: "Road",
    63: "Road",
    62: "Road",
    57: "Road",
    52: "Road",
    80: "Road",
    79: "Road",
    78: "Road",
    77: "Road",

    44: "Road",
    19: "Road",
    46: "Road",
    45: "Road",

    91: "Tube",
    92: "Tube",
    93: "Tube",
    94: "Tube",
    95: "Tube",
    96: "Tube",
    97: "Tube",

    98: "Nature",
    101: "Nature",
    103: "Nature",

    81: "Pipe",
    82: "Pipe",
    83: "Pipe",
    84: "Pipe",
    90: "Pipe",
    85: "Pipe",
    86: "Pipe",
    87: "Pipe",
    88: "Pipe",
    89: "Pipe",
    43: "Road",
    20: "Arrows",
    21: "Arrows",
    48: "Arrows",
    47: "Arrows"
}

function getPieceColor(pieceType, y, yRange) {
    let yMin = yRange[0];
    let yMax = yRange[1];

    let yEffect = (y - yMin) / (yMax - yMin);
    yEffect += 0.5;
    
    let color = {};
    switch (pieceType) {
        case "Road":
            color.r = 40;
            color.g = 40;
            color.b = 40;
            color.a = 0.4;
            break;
        case "Start":
            color.r = 0;
            color.g = 0;
            color.b = 255;
            color.a = 1;
            break;
        case "Finish":
            color.r = 255;
            color.g = 0;
            color.b = 0;
            color.a = 1;
            break;
        case "Metal":
            color.r = 100;
            color.g = 100;
            color.b = 100;
            color.a = 0.5;
            break;
        case "Platform":
            color.r = 200;
            color.g = 200;
            color.b = 200;
            color.a = 0.5;
            break;
        case "Tube":
            color.r = 71;
            color.g = 221;
            color.b = 255;
            color.a = 0.5;
            break;
        case "Nature":
            color.r = 100;
            color.g = 255;
            color.b = 100;
            color.a = 0.3;
            break;
        case "Pipe":
            color.r = 255;
            color.g = 255;
            color.b = 255;
            color.a = 0.5;
            break;
        case "Arrows":
            color.r = 10;
            color.g = 10;
            color.b = 10;
            color.a = 0.7;
    }

    yEffect = 1;

    for (let i = 0; i < 3; i++) {
        color[Object.keys(color)[i]] = Math.min(255, color[Object.keys(color)[i]] * yEffect);
    }
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
}