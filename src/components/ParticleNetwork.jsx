import React, { useCallback } from 'react';
import { Particles } from '@tsparticles/react';
import { loadAll } from '@tsparticles/all';

const ParticleNetwork = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        background: { color: '#000' },
        fullScreen: false,
        particles: {
          number: { value: 30 },
          color: { value: '#fff' },
          links: { enable: true, color: '#fff', distance: 120 },
          move: { enable: true, speed: 0.5 },
        },
      }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
};

export default ParticleNetwork; 