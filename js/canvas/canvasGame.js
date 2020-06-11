const game = () => {
    let canvas = document.getElementById('canvas');
    let canvasContext = canvas.getContext('2d');

    document.querySelector('body').setAttribute('style', 'margin: 0; padding: 0;');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    let craft = new Image();
    let backG = new Image();
    let columnT = new Image();
    let columnB = new Image();
    let cometa = new Image();
    let scoreAudio = new Audio();

    craft.src = './js/canvas/spacecraft.png';
    backG.src = './js/canvas/bg.jpg';
    columnT.src = './js/canvas/columnT.png';
    columnB.src = './js/canvas/column.png';
    cometa.src = './js/canvas/cometapng.png'
    scoreAudio.src = './js/canvas/score.mp3';
    
    let gap = 130;
    let constant;
    let craftXp = 110;
    let craftYp = 150;
    let gravity = 1; 
    let score = 0;

    function moveUp() {
        craftYp -= 30;
    };
    document.addEventListener('keydown', moveUp);

    //pipe cordinates
    let pipe = [];
    let cometaPosition = [];
    pipe[0] = {
        x : canvas.width,
        y : 0
    };
    cometaPosition[0] = {
        x : canvas.width,
        y : 332
    };

    //draw images
    const draw = () => {
        // window.requestAnimationFrame(draw);
        canvasContext.drawImage(backG, 0, 0);
        cometaPosition.y = Math.floor(Math.random() * canvas.height);

        for(let i = 0; i < pipe.length; i++) {
            constant = columnT.height + gap;
            canvasContext.drawImage(columnT, pipe[i].x, pipe[i].y);
            canvasContext.drawImage(columnB, pipe[i].x, pipe[i].y + constant);
            pipe[i].x = pipe[i].x - 2;
            if(pipe[i].x === canvas.width - 360) { 
                pipe.push({
                    x : canvas.width,
                    y : Math.floor(Math.random() * columnT.height) - columnT.height
                });
            };
            //detect collision
            if(craftXp + craft.width >= pipe[i].x && craftXp <= pipe[i].x + columnT.width
            && (craftYp <= pipe[i].y + columnT.height || craftYp + craft.height >=
            pipe[i].y + constant ) || craftYp + craft.height > canvas.height || craftYp < -15) {
                let gameAlert = confirm('Wanna play again?');
                if(gameAlert === true) {
                    return game();
                } else {
                    return location.reload();
                };
            };
            if(pipe[i].x === 20) {
                score++;
                scoreAudio.play();
            };
        };
        for(let j = 0; j < cometaPosition.length; j++) {
            canvasContext.drawImage(cometa, cometaPosition[j].x, cometaPosition[j].y);
            cometaPosition[j].x = cometaPosition[j].x - 5;
            if(cometaPosition[j].x === 0) {
                cometaPosition.push({
                    x : canvas.width,
                    y : Math.floor(Math.random() * canvas.height)
                });
            };
        };
        canvasContext.drawImage(craft, craftXp, craftYp);

        craftYp += gravity;
        canvasContext.fillStyle = '000';
        canvasContext.font = '20px Verdana';
        canvasContext.fillText('Score :' + score, 10, canvas.height - 20);
        requestAnimationFrame(draw);
    };
    draw();
};

document.getElementById('space_game').addEventListener('click', () => {
    document.open();
    document.write('<canvas id="canvas"></canvas>');
    document.close();
    game();
});