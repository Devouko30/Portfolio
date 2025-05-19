
import { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Create stars
    const stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number }[] = [];
    const STAR_COUNT = 200;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.random() * 0.1 - 0.05,
        vy: Math.random() * 0.1 - 0.05,
        alpha: Math.random()
      });
    }

    // Animation
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Twinkle effect
        star.alpha += Math.random() * 0.02 - 0.01;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;

        // Move stars
        star.x += star.vx;
        star.y += star.vy;

        // Reset if off canvas
        if (star.x < 0 || star.x > canvas.width) star.x = Math.random() * canvas.width;
        if (star.y < 0 || star.y > canvas.height) star.y = Math.random() * canvas.height;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-black" />;
};

export default StarryBackground;
