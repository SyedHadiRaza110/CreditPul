import React from "react";

function Cube({ size, top, left, right, duration, color }) {
  const half = size / 2;
  const style = { top, left, right };
  return (
    <div className="cube-scene" style={style}>
      <div className="cube" style={{ width: size, height: size, animationDuration: `${duration}s` }}>
        <div className="face" style={{ width: size, height: size, transform: `translateZ(${half}px)`, borderColor: color }} />
        <div className="face" style={{ width: size, height: size, transform: `translateZ(-${half}px) rotateY(180deg)`, borderColor: color }} />
        <div className="face" style={{ width: size, height: size, transform: `rotateY(90deg) translateZ(${half}px)`, borderColor: color }} />
        <div className="face" style={{ width: size, height: size, transform: `rotateY(-90deg) translateZ(${half}px)`, borderColor: color }} />
        <div className="face" style={{ width: size, height: size, transform: `rotateX(90deg) translateZ(${half}px)`, borderColor: color }} />
        <div className="face" style={{ width: size, height: size, transform: `rotateX(-90deg) translateZ(${half}px)`, borderColor: color }} />
      </div>
    </div>
  );
}

function BackgroundShapes() {
  return (
    <>
      <Cube size={160} top="8%" right="6%" duration={26} color="rgba(181, 101, 201, 0.4)" />
      <Cube size={100} top="60%" left="4%" duration={19} color="rgba(74, 143, 166, 0.35)" />
    </>
  );
}

export default BackgroundShapes;
