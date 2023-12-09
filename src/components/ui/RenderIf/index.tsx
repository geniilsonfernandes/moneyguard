import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';

const animations = {
  bounce: {
    initial: { y: -30 },
    animate: { y: 0 },
    exit: { y: 30 },
    transition: { type: 'spring', damping: 2, stiffness: 100 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { type: 'spring', damping: 2, stiffness: 100 }
  }
} as {
  [key: string]: HTMLMotionProps<'div'>;
};

type RenderIfProps = {
  children: React.ReactNode;
  condition: boolean;
  className?: string;
  animation?: 'bounce' | 'fadeIn' | 'none';
};

const RenderIf = ({ children, condition, className, animation = 'fadeIn' }: RenderIfProps) => {
  if (!condition) {
    return null;
  }

  if (animation === 'none') {
    return <>{children}</>;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={animations[animation].initial}
        animate={animations[animation].animate}
        exit={animations[animation].exit}
        className={className}>
        <div>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RenderIf;
