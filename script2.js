const gameArea = document.getElementById("game-area");
const scoreElement = document.getElementById("score");
const progressBar = document.querySelector(".progress");
let score = 0;
let heartInterval;

function spawnHeart() {
    if (score >= 10) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "👧🏻";
    
    // Aumentamos el tama帽o del coraz贸n
    heart.style.fontSize = "40px"; // Puedes ajustar este valor seg煤n lo necesites
    
    heart.style.left = `${Math.random() * 90}vw`;
    heart.style.top = `-50px`;

    heart.addEventListener("click", () => {
        score++;
        scoreElement.textContent = score;
        progressBar.style.width = `${(score / 10) * 100}%`;
        heart.remove();

        if (score === 10) {
            /*clearInterval(heartInterval);
            alert("隆Felicidades! 鉂わ笍馃帀");*/
            
            // A帽adir mensaje de cuenta regresiva
            let countdown = 5;
            const countdownMessage = document.createElement("div");
            countdownMessage.style.position = "fixed";
            countdownMessage.style.top = "50%";
            countdownMessage.style.left = "50%";
            countdownMessage.style.transform = "translate(-50%, -50%)";
            countdownMessage.style.fontSize = "24px";
            countdownMessage.style.color = "#ff0066";
            countdownMessage.style.fontWeight = "bold";
            document.body.appendChild(countdownMessage);

            const countdownInterval = setInterval(() => {
                countdownMessage.textContent = `Felicidades Madrecita! 🥰\n Pasando al siguiente nivel en ${countdown} segundos...`;
                countdown--;
                
                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    window.location.href = "caja_fuerte.html";
                }
            }, 1000);
        }
    });

    gameArea.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

heartInterval = setInterval(spawnHeart, 1000);

// El resto del c贸digo se mantiene igual...

// Part铆culas en el fondo
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 2,
        speedY: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
    };
}

for (let i = 0; i < 50; i++) {
    particles.push(createParticle());
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
        ctx.fillStyle = `rgba(255, 0, 100, ${particle.opacity})`;
        ctx.font = `${particle.size}px Arial`;
        ctx.fillText("👧🏻", particle.x, particle.y);
        particle.y -= particle.speedY;

        if (particle.y < -10) {
            particle.y = canvas.height;
            particle.x = Math.random() * canvas.width;
        }
    }
    
    requestAnimationFrame(drawParticles);
}

drawParticles();


//////////
// Agregar este c贸digo en script2.js (p谩gina del juego)
function initializeAudio() {
    const musica = document.getElementById("musica");
    
    // Recuperar el tiempo de reproducci贸n guardado
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime) {
        musica.currentTime = parseFloat(savedTime);
    }
    
    // Guardar el tiempo de reproducci贸n peri贸dicamente
    setInterval(() => {
        localStorage.setItem('audioTime', musica.currentTime);
    }, 1000);
    
    // Manejar el final de la canci贸n
    musica.addEventListener('ended', function() {
        musica.currentTime = 0;
        musica.play();
    });
    
    // Intentar reproducir
    document.addEventListener("click", function() {
        musica.play().catch(function(error) {
            console.log("Error al reproducir audio:", error);
        });
    }, { once: true });
    
    musica.play().catch(function(error) {
        console.log("Reproducción automática bloqueada:", error);
    });
}

document.addEventListener("DOMContentLoaded", initializeAudio);

// Antes de que la p谩gina se cierre o el usuario navegue
window.addEventListener('beforeunload', function() {
    const musica = document.getElementById("musica");
    localStorage.setItem('audioTime', musica.currentTime);
});