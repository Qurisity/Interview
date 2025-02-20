const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;  // Set canvas's width
canvas.height = window.innerHeight; // Set canvas's height

canvas.style.backgroundColor = '#fd12'; // Set canvas's background color

// Circle class
class Circle {
    constructor(x, y, colour, radius, speed, text) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.radius = radius;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        // Draw Text  
        context.textAlign = 'center';
        context.textBaseline = 'middle';  
        context.font = '30px Arial';
        context.fillText(this.text, this.x, this.y);

        // Draw circle
        context.lineWidth = 7;
        context.strokeStyle = this.colour;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update() {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(context);

        this.text = circle_counter;

        // Check if circle is at the edge of the canvas
        if((this.x + this.radius) > canvas.width) {
            this.dx = -this.dx;
            circle_counter++;
        }

        if ((this.x - this.radius) < 0) {
            this.dx = -this.dx;
            circle_counter++;
        }
        
        if((this.y + this.radius) > canvas.height) {
            this.dy = -this.dy;
            circle_counter++;
        }

        if ((this.y - this.radius) < 0) {
            this.dy = -this.dy;
            circle_counter++;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}

let circle_counter = 1;

let circles = [];

const mycircle = new Circle(100, 100, 'red', 50, 5, circle_counter);

mycircle.draw(context);

let updateCircle = () => { 
    requestAnimationFrame(updateCircle);
    mycircle.update();
}

updateCircle();
