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

type FadeInProps = {
  children: React.ReactNode;
  animation?: keyof typeof animations;
} & HTMLMotionProps<'div'>;

const FadeIn = ({ children, animation = 'fadeIn', ...props }: FadeInProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={animations[animation].initial}
        animate={animations[animation].animate}
        exit={animations[animation].exit}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
export default FadeIn;
