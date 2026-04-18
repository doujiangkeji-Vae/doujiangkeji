import { useScrollAnimation } from '../hooks/useAnimations';

function ScrollAnimation({ children, className = '', animation = 'fadeInUp', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();

  const animationMap = {
    fadeInUp: 'animate-fade-in-up',
    fadeInLeft: 'animate-fade-in-left',
    fadeInRight: 'animate-fade-in-right',
    fadeIn: 'animate-fade-in',
    scaleIn: 'animate-scale-in'
  };

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationMap[animation] : ''}`}
      style={{
        opacity: isVisible ? undefined : 0,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export default ScrollAnimation;
