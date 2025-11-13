import React from "react";

export default function ProjectsMarquee({ projects, direction = "left" }) {
  const n = projects.length || 0;
  let mixed = [];
  if (n > 1) {
    const step = Math.floor(n / 2) || 1;
    for (let i = 0; i < n; i++) {
      mixed.push(projects[i]);
      mixed.push(projects[(i + step) % n]);
    }
  } else {
    mixed = [...projects];
  }

  const duplicatedProjects = [...mixed, ...mixed];
  
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
