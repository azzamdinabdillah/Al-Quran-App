import React, { useState, useRef, useEffect } from "react";

const Tabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(null);
  const [swipeEndX, setSwipeEndX] = useState(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const handleSwipe = () => {
      const tabsWidth = tabsRef.current.offsetWidth;
      const minSwipeDistance = tabsWidth * 0.15;
      const swipeDistance = swipeEndX - swipeStartX;

      if (swipeDistance > minSwipeDistance && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (swipeDistance < -minSwipeDistance && activeIndex < 3) {
        setActiveIndex(activeIndex + 1);
      }
    };

    if (swipeEndX !== null) {
      handleSwipe();
      setSwipeStartX(null);
      setSwipeEndX(null);
    }
  }, [swipeEndX, swipeStartX, activeIndex]);

  const handleTouchStart = (event) => {
    setSwipeStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setSwipeEndX(event.touches[0].clientX);
  };

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div ref={tabsRef} style={{ display: "flex", overflowX: "hidden", backgroundColor:"yellow" }}>
      <div style={{ flex: 1, width: "100%", transform: `translateX(-${activeIndex * 100}%)` }}>
        <div style={{ width: "100%" }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          <div onClick={() => handleTabClick(0)}>Tab 1</div>
          <div onClick={() => handleTabClick(1)}>Tab 2</div>
          <div onClick={() => handleTabClick(2)}>Tab 3</div>
          <div onClick={() => handleTabClick(3)}>Tab 4</div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;