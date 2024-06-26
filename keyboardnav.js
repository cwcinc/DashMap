window.addEventListener('keydown', function(event) {
    //console.log(event.key);
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
        case 'q':
            keys.q = true;
            break;
        case 'e':
            keys.e = true;
            break;

        case 'arrowleft':
            handleGhostClick(selectedGhost - 1);
            break;
        case 'arrowright':
            handleGhostClick(selectedGhost + 1);
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
        case 'q':
            keys.q = false;
            break;
        case 'e':
            keys.e = false;
            break;
  }
});