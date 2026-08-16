
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.005
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha > 1 || star.alpha < 0) {
      star.speed = -star.speed;
    }
    ctx.save();
    ctx.globalAlpha = Math.abs(star.alpha);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  requestAnimationFrame(animateStars);
}

animateStars();

function launchConfetti() {
  if (typeof confetti === 'function') {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 200);
  }
}

window.addEventListener('load', () => {
  setTimeout(launchConfetti, 500);
});

document.addEventListener('click', launchConfetti);

const flame = document.getElementById('flame');
if (flame) {
  flame.addEventListener('click', (e) => {
    e.stopPropagation(); 
    flame.classList.toggle('off');
    
    if (flame.classList.contains('off')) {
      launchConfetti();
    }
  });
}