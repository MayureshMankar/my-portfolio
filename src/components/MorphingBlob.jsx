import React from 'react';
import { motion, useCycle } from 'framer-motion';
import { Particles } from "./magicui/particles";

// Define several blob path shapes for morphing
const blobPaths = [
  // Blob 1
  'M44.5,-62.2C56.7,-54.2,64.7,-37.2,66.2,-21.2C67.7,-5.2,62.7,9.8,56.1,23.2C49.5,36.6,41.3,48.4,30.2,56.2C19.1,64,5.1,67.8,-9.2,70.1C-23.5,72.4,-38.1,73.2,-48.7,65.1C-59.3,57,-65.9,40,-67.2,23.2C-68.5,6.4,-64.5,-10.2,-57.2,-24.2C-49.9,-38.2,-39.3,-49.6,-26.7,-57.6C-14.1,-65.6,0.6,-70.2,15.2,-70.2C29.8,-70.2,44.5,-62.2,44.5,-62.2Z',
  // Blob 2
  'M38.2,-59.2C50.2,-51.2,59.7,-39.2,62.2,-25.7C64.7,-12.2,60.2,3.8,54.2,19.2C48.2,34.6,40.7,49.4,28.7,56.7C16.7,64,0.2,63.8,-13.7,59.2C-27.6,54.6,-39.9,45.6,-50.2,34.2C-60.5,22.8,-68.8,8.9,-67.2,-4.2C-65.6,-17.3,-54.1,-29.6,-42.2,-37.7C-30.3,-45.8,-18.1,-49.7,-4.2,-51.7C9.7,-53.7,19.4,-53.2,38.2,-59.2Z',
  // Blob 3
  'M41.7,-62.2C54.2,-54.2,62.7,-41.2,65.2,-27.2C67.7,-13.2,64.2,1.8,59.1,16.2C54,30.6,47.3,44.4,36.2,53.2C25.1,62,9.6,65.8,-5.2,68.2C-20,70.6,-34,71.6,-45.7,64.1C-57.4,56.6,-66.8,40.6,-68.2,24.2C-69.6,7.8,-63.1,-9,-55.2,-23.2C-47.3,-37.4,-38,-49,-26.2,-56.2C-14.4,-63.4,0,-66.2,14.2,-66.2C28.4,-66.2,41.7,-62.2,41.7,-62.2Z',
  // Blob 4
  'M44.5,-62.2C56.7,-54.2,64.7,-37.2,66.2,-21.2C67.7,-5.2,62.7,9.8,56.1,23.2C49.5,36.6,41.3,48.4,30.2,56.2C19.1,64,5.1,67.8,-9.2,70.1C-23.5,72.4,-38.1,73.2,-48.7,65.1C-59.3,57,-65.9,40,-67.2,23.2C-68.5,6.4,-64.5,-10.2,-57.2,-24.2C-49.9,-38.2,-39.3,-49.6,-26.7,-57.6C-14.1,-65.6,0.6,-70.2,15.2,-70.2C29.8,-70.2,44.5,-62.2,44.5,-62.2Z', // Loop back to Blob 1
];

const transition = {
  duration: 8,
  repeat: Infinity,
  ease: 'easeInOut',
  repeatType: 'loop',
};

const MorphingBlob = ({
  width = '100%',
  height = '100%',
  style = {},
  className = '',
}) => {
  // Cycle through the blob paths
  const [current, cycle] = useCycle(0, 1, 2, 3);

  React.useEffect(() => {
    const interval = setInterval(() => {
      cycle();
    }, transition.duration * 1000 / (blobPaths.length - 1));
    return () => clearInterval(interval);
  }, [cycle]);

  return (
    <div
      className={className}
      style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
    >
      <motion.svg
        viewBox="-80 -80 160 160"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d={blobPaths[current]}
          fill="#fff"
          initial={false}
          animate={{ d: blobPaths[(current + 1) % blobPaths.length] }}
          transition={transition}
        />
      </motion.svg>
    </div>
  );
};

export default MorphingBlob; 