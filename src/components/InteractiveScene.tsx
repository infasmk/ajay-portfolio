import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InteractiveScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const currentContainer = containerRef.current;
    
    // Size setup
    let width = currentContainer.clientWidth;
    let height = currentContainer.clientHeight;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    currentContainer.appendChild(renderer.domElement);

    // Create Groups
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core Element - An elegant glassmorphic/wireframe torus knot
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1.6, 0.4, 120, 16);
    
    // Multi-layered visual: Wireframe skeleton + Translucent glossy body
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed, // Purple accent
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    
    const glossyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeef2f7,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6, // Translucency
      thickness: 1.5,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });

    const torusWireframe = new THREE.Mesh(torusKnotGeometry, wireframeMaterial);
    const torusGlossy = new THREE.Mesh(torusKnotGeometry, glossyMaterial);
    
    mainGroup.add(torusWireframe);
    mainGroup.add(torusGlossy);

    // 2. Floating auxiliary particles/geometric objects
    const floatersGroup = new THREE.Group();
    mainGroup.add(floatersGroup);

    const geometries = [
      new THREE.IcosahedronGeometry(0.35, 1),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.SphereGeometry(0.2, 16, 16)
    ];

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x2563eb, // blue accent
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.8,
        thickness: 0.5,
        transparent: true,
        opacity: 0.6
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4, // Cyan
        roughness: 0.1,
        metalness: 0.2,
        transmission: 0.8,
        thickness: 0.5,
        transparent: true,
        opacity: 0.5
      }),
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      })
    ];

    const floaterObjects: { mesh: THREE.Mesh; seedX: number; seedY: number; speed: number }[] = [];

    for (let i = 0; i < 15; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      // Random position distribution
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      );

      // Random scale
      const s = 0.5 + Math.random() * 0.8;
      mesh.scale.set(s, s, s);

      floatersGroup.add(mesh);
      floaterObjects.push({
        mesh,
        seedX: Math.random() * 200,
        seedY: Math.random() * 200,
        speed: 0.05 + Math.random() * 0.1,
      });
    }

    // 3. Lighting Setup for cinematic glass refraction and soft reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7c3aed, 1.5); // Purple backlight
    dirLight2.position.set(-5, -3, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x06b6d4, 2.0, 15); // Cyan reactive mouse light
    scene.add(pointLight);

    // Event handler for pointer tracking
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to -1 to 1 range
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Resize observer (guarantees responsive sizing)
    const handleResize = () => {
      if (!currentContainer) return;
      width = currentContainer.clientWidth;
      height = currentContainer.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(currentContainer);

    // Animation variables
    let clock = new THREE.Clock();
    let animationFrameId: number;

    // Tick Loop
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Mouse Lerp animation (tactile inertia)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Rotate primary group gently
      torusWireframe.rotation.x = elapsedTime * 0.1;
      torusWireframe.rotation.y = elapsedTime * 0.12;
      torusGlossy.rotation.x = elapsedTime * 0.1;
      torusGlossy.rotation.y = elapsedTime * 0.12;

      // Mouse reactive rotation tilt on the overall mainGroup
      mainGroup.rotation.y = mouseRef.current.x * 0.5;
      mainGroup.rotation.x = -mouseRef.current.y * 0.4;

      // Animate floating objects in orbit waves
      floaterObjects.forEach((obj, idx) => {
        const { mesh, seedX, seedY, speed } = obj;
        
        // Idle wave oscillations
        mesh.position.y += Math.sin(elapsedTime * speed + seedY) * 0.003;
        mesh.position.x += Math.cos(elapsedTime * speed + seedX) * 0.002;
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.002;

        // Mouse attraction warp
        const dx = mouseRef.current.x * 2 - mesh.position.x;
        const dy = mouseRef.current.y * 2 - mesh.position.y;
        mesh.position.x += dx * 0.01;
        mesh.position.y += dy * 0.01;
      });

      // Point light tracks mouse
      pointLight.position.set(mouseRef.current.x * 6, mouseRef.current.y * 5, 3);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup logic
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      // Memory cleanup
      if (currentContainer.contains(renderer.domElement)) {
        currentContainer.removeChild(renderer.domElement);
      }
      
      torusKnotGeometry.dispose();
      wireframeMaterial.dispose();
      glossyMaterial.dispose();
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="3d-interactive-canvas-container"
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
