const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

// ГGenerating ranodm polyygons
function generatePolygons() {
    const polygons = [];
    const numLines = 10;
    const points = [
        { x: 0, y: 0 },
        { x: canvas.width, y: 0 },
        { x: canvas.width, y: canvas.height },
        { x: 0, y: canvas.height }
    ];

    for (let i = 0; i < numLines; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        });
    }

    points.sort((a, b) => a.x - b.x || a.y - b.y);
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            polygons.push([
                points[i],
                points[j],
                { x: points[j].x, y: canvas.height },
                { x: points[i].x, y: canvas.height }
            ]);
        }
    }

    return polygons;
}

let polygons = generatePolygons();
let animationState = 0;

// Drawing polygons
function drawPolygons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    polygons.forEach((polygon, index) => {
        let color = `hsl(${index * 30}, 100%, 50%)`;
        ctx.fillStyle = color;
        ctx.beginPath();
        polygon.forEach((point, i) => {
            // Calculate an oscillating offset for smooth movement
            // Math.sin() and Math.cos() create cyclic motion based on animationState
            let offsetX = Math.sin(animationState / 20) * (index % 2 === 0 ? 50 : -50); //
            let offsetY = Math.cos(animationState / 20) * (index % 2 === 0 ? 50 : -50);
            // Move the polygon point by the calculated offset
            ctx.lineTo(point.x + offsetX, point.y + offsetY);
        });
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.stroke();
    });

    animationState++;
    requestAnimationFrame(drawPolygons);
}

drawPolygons();