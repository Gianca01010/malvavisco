document.addEventListener("mousemove", function(event) {
    let x = (event.clientX / window.innerWidth - 0.5) * 10;  // Movimiento horizontal
    let y = (event.clientY / window.innerHeight - 0.5) * 10; // Movimiento vertical
    
    document.getElementById("background").style.transform = `translate(${x}px, ${y}px)`;
});
