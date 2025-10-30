import React from "react";

export default function VerticalMarquee({ projects, direction = "up" }) {
  const duplicatedProjects = [...projects, ...projects];
  
  return (
    <div className="vertical-marquee-container">
      <div className={`vertical-marquee-content vertical-marquee-${direction}`}>
        {duplicatedProjects.map((project, index) => (
          <div key={`${project.id}-${index}`} className="vertical-marquee-item">
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-[280px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
