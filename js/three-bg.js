/**
 * Three.js 3D Particle Background Module
 * Renders a reactive particle field on the #webgl-bg canvas.
 */
window.ResumeApp = window.ResumeApp || {};

window.ResumeApp.initThreeBackground = function () {
    try {
        const canvas = document.getElementById('webgl-bg');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        // Particle system
        const particleCount = 1500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const palette = [
            new THREE.Color('#0ea5e9'),
            new THREE.Color('#8b5cf6'),
            new THREE.Color('#ec4899'),
            new THREE.Color('#34d399'),
            new THREE.Color('#1e293b'),
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 120;
            positions[i3 + 1] = (Math.random() - 0.5) * 120;
            positions[i3 + 2] = (Math.random() - 0.5) * 60;
            originalPositions[i3] = positions[i3];
            originalPositions[i3 + 1] = positions[i3 + 1];
            originalPositions[i3 + 2] = positions[i3 + 2];
            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            sizes[i] = Math.random() * 2.5 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const vertexShader = `
            attribute float size;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (200.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
        const fragmentShader = `
            varying vec3 vColor;
            void main() {
                float d = length(gl_PointCoord - vec2(0.5));
                if (d > 0.5) discard;
                float alpha = smoothstep(0.5, 0.1, d) * 0.6;
                gl_FragColor = vec4(vColor, alpha);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader, fragmentShader,
            transparent: true, depthWrite: false,
            vertexColors: true,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Mouse interaction
        const mouse = { x: 0, y: 0 };
        document.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();
            const pos = geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const ox = originalPositions[i3];
                const oy = originalPositions[i3 + 1];
                // Gentle wave
                pos[i3] = ox + Math.sin(elapsed * 0.3 + oy * 0.05) * 1.5;
                pos[i3 + 1] = oy + Math.cos(elapsed * 0.2 + ox * 0.05) * 1.5;
                // Mouse repulsion
                const dx = pos[i3] - mouse.x * 50;
                const dy = pos[i3 + 1] - mouse.y * 50;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 20) {
                    const force = (20 - dist) / 20;
                    pos[i3] += (dx / dist) * force * 3;
                    pos[i3 + 1] += (dy / dist) * force * 3;
                }
            }
            geometry.attributes.position.needsUpdate = true;

            particles.rotation.y = elapsed * 0.02;
            particles.rotation.x = Math.sin(elapsed * 0.01) * 0.1;

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (e) {
        console.warn('WebGL not available:', e);
    }
};
