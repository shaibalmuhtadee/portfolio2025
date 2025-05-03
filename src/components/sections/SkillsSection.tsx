"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[75vw] xl:max-w-6xl">
        <h1 className="text-4xl font-bold mb-12">Skills</h1>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="bg-gray-500 ml-4"
        >
          <Grid size={{ xs: 6, md: 8 }}>
            <h1>xs=6 md=8</h1>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <h1>xs=6 md=4</h1>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <h1>xs=6 md=4</h1>
          </Grid>
          <Grid size={{ xs: 6, md: 8 }}>
            <h1>xs=6 md=8</h1>
          </Grid>
        </Grid>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex flex-col space-y-8">
              <h2 className="text-xl font-semibold uppercase">Languages</h2>
              <h2 className="text-xl font-semibold uppercase">Frameworks</h2>
              <h2 className="text-xl font-semibold uppercase">Tools</h2>
              <h2 className="text-xl font-semibold uppercase">Libraries</h2>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="flex flex-col space-y-8">
              <p className="text-lg">
                JavaScript, TypeScript, Python, Java, C++, HTML/CSS
              </p>
              <p className="text-lg">
                React, Next.js, Node.js, Express, Django, Spring Boot
              </p>
              <p className="text-lg">
                Git, Docker, VS Code, Postman, Chrome DevTools, Figma
              </p>
              <p className="text-lg">
                Material UI, Tailwind CSS, Redux, Jest, React Testing Library
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
