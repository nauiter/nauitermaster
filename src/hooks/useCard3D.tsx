import { useState, MouseEvent, TouchEvent } from 'react';

interface Card3DState {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export const useCard3D = (strength: number = 10) => {
  const [cardState, setCardState] = useState<Card3DState>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -strength;
    const rotateY = ((x - centerX) / centerX) * strength;

    setCardState({
      rotateX,
      rotateY,
      scale: 1.05,
    });
  };

  const handleMouseLeave = () => {
    setCardState({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  // Touch events for mobile devices
  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -strength;
    const rotateY = ((x - centerX) / centerX) * strength;

    setCardState({
      rotateX,
      rotateY,
      scale: 1.05,
    });
  };

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -strength;
    const rotateY = ((x - centerX) / centerX) * strength;

    setCardState({
      rotateX,
      rotateY,
      scale: 1.05,
    });
  };

  const handleTouchEnd = () => {
    setCardState({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateX(${cardState.rotateX}deg) rotateY(${cardState.rotateY}deg) scale(${cardState.scale})`,
    transition: 'transform 0.3s ease-out',
  };

  return {
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    cardStyle,
  };
};
