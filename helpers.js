function drawCircle(x, y, rad, fill) {
    can.beginPath();
    can.moveTo(x, y);
    can.fillStyle = fill;
    can.arc(x, y, rad, 0, 2 * Math.PI, false);
    can.fill();
    can.stroke();
    can.closePath();
}

function lineBetween(x1, y1, x2, y2, weight, fill) {
    can.beginPath();
    can.moveTo(x1,y1);
    can.strokeWidth = weight;
    can.strokeStyle = fill;
    can.lineTo(x2,y2);
    can.stroke();
    can.closePath();
}