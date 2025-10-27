import React from "react";

export default function ProjectsMarquee({ projects, direction = "left" }) {
  const duplicatedProjects = [...projects, ...projects, ...projects];
  
  return (
    <div className="marquee-container">
      <div className={`marquee-content marquee-${direction}`}>
        {duplicatedProjects.map((project, index) => (
          <div key={`${project.id}-${index}`} className="marquee-item">
            <div className="w-[280px] md:w-[320px] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-[200px] md:h-[240px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
