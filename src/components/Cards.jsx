import React from "react";
import FeaturesSectionWithHoverEffects from "./feature-section-with-hover-effects";

function Cards() {
  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-[90%] left-0 w-full">
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export default Cards;