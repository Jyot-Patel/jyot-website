
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext('2d');

    window.addEventListener('resize', function () { 
    window.location.reload(); 
    });

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    var mouse = {
        x: undefined,
        y: undefined,
    };

    canvas.addEventListener("mousemove", function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    function Circle(x, y, radius, xSpeed, ySpeed, chosenColor) {


        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.chosenColor = chosenColor;

        this.draw = function () {
            c.beginPath();
            if(this.chosenColor=='black'){
               this.chosenColor='yellow';
            }
            c.fillStyle = this.chosenColor;
            c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
            c.fill();
        };

        this.update = function () {

            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.xSpeed = -this.xSpeed;
            }

            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.ySpeed = -this.ySpeed;
            }
            this.x += this.xSpeed;
            this.y += this.ySpeed;

            //interactivity
            if (canvas.width > 900) {
                if (mouse.x - this.x < distance && mouse.x - this.x > -distance &&
                    mouse.y - this.y < distance && mouse.y - this.y > -distance) {
                    if (this.radius < circleMaxSize) {
                        this.radius += 1;
                    }
                } else if (this.radius > 1) {
                    this.radius -= 1;
                }
            }
            this.draw();
        };

    }
    //code for responsive canvas animation

    var circles;
    var distance;
    var circleMaxSize;

    var img1 = document.querySelector("#top-img");
    var img2 = document.querySelector("#top-img");

    var xPosition;
    var yPosition;
    var cloudHeight;
    var cloudWidth;


    var xPosition2;
    var yPosition2;
    var cloudHeight2;
    var cloudWidth2;



    if (canvas.width > 1500) {
        xPosition = canvas.width / 8;
        yPosition = canvas.height / 10;
        cloudHeight = 250;
        cloudWidth = 350;

        xPosition2 = canvas.width - canvas.width / 3;
        yPosition2 = canvas.height - canvas.height / 3;

        circles = 1200;
        distance = 70;
        circleMaxSize = 50;
        radius = 2;
    } else if (canvas.width > 900) {
        xPosition = canvas.width / 8;
        yPosition = canvas.height / 10;
        cloudHeight = 150;
        cloudWidth = 200;

        xPosition2 = canvas.width - canvas.width / 3;
        yPosition2 = canvas.height - canvas.height / 3;


        circles = 800;
        distance = 60;
        circleMaxSize = 40;
        radius = 2;


    } else if (canvas.width > 600) {
        cloudHeight = 100;
        cloudWidth = 150;

        xPosition = canvas.width / 8;
        yPosition = canvas.height / 10;

        xPosition2 = canvas.width - canvas.width / 3;
        yPosition2 = canvas.height / 2 + canvas.height / 4;

        circles = 30;
        radius = 25;

    } else if (canvas.width > 300) {
        cloudHeight = 110;
        cloudWidth = 160;

        xPosition = canvas.width / 6;
        yPosition = canvas.height / 8;

        xPosition2 = canvas.width - canvas.width / 2;
        yPosition2 = canvas.height / 2 + canvas.height / 5;

        circles = 20;
        radius = 20;


    }

    function drawText() {
        c.textAlign = "center";
        c.fillStyle = "black";
        c.font = "60px Merienda One";
        c.fillText("Jyot Patel", canvas.width / 2, canvas.height / 2 - 30);
        c.fill();

        c.font = "50px Create Round";
        c.fillText("A professional ", canvas.width / 2, canvas.height / 2 + 30);
        c.fill();
        c.font = "50px Create Round";
        c.fillText("web developer", canvas.width / 2, canvas.height / 2 + 70);
        c.fill();

        c.drawImage(img1, xPosition, yPosition, cloudWidth, cloudHeight);
        c.drawImage(img2, xPosition2, yPosition2, cloudWidth, cloudHeight)
    };

    //multiple circles code
    var circleArray = [];

    for (i = 0; i < circles; i++) {
        var x = Math.round(Math.random() * canvas.width) - 20;
        var y = Math.round(Math.random() * canvas.height) - 20;

        var radius;

        var xSpeed;
        var ySpeed;

        if (canvas.width > 900) {
            xSpeed = (Math.random() - 0.5);
            ySpeed = (Math.random() - 0.5);
        } else if (canvas.width < 900) {
            xSpeed = (Math.random() - 0.5) * 10;
            ySpeed = (Math.random() - 0.5) * 10;
        }

        var colors = ["aqua", "Red", "violet", "yellow", "pink", "rgba(50,560,20,1)"];
        var indexColor = Math.round(Math.random() * colors.length);
        var chosenColor = colors[indexColor];

        circleArray.push(new Circle(this.x, this.y, this.radius, this.xSpeed, this.ySpeed, this.chosenColor))

    }



    //code for moving circle animation

    function animation() {

        c.clearRect(0, 0, canvas.width, canvas.height);

        for (var j = 0; j < circleArray.length; j++) {
            circleArray[j].update();
        }

        drawText();

        requestAnimationFrame(animation);
    };

    animation();
