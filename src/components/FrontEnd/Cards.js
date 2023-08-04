import * as React from "react";
import Cards from "../ProjectCards/Cards";
import portfolio from "../../images/portfolio-homepage.png";
import slick from "../../images/slicknspan.png";
import takeover from "../../images/Takeover.png";
import takeoverblog from "../../images/takeover_blog.png";
import { AnimatePresence } from "framer-motion";

export default function FrontEnd() {
  return (
    <>
      <AnimatePresence>
        <Cards
          key={1}
          timing={0}
          heading="Portfolio v1"
          desc="Interactive web experience using Three.js, Blender 3D modeling, GSAP Scroll Triggers, and much more. Previous version of this portfolio."
          stack={[
            "Node",
            "JavaScript",
            "Three.js",
            "WebGL",
            "Next.js",
            "Blender 3D",
          ]}
          src={portfolio}
        />

        <Cards
          key={2}
          timing={1}
          heading="Takeover Pods Blog and Podcasting Application"
          desc="Web app connected to Spotify web API. Allows users to connect to their personal Spotify account and listen to podcasts by 'Takeover Pods' while maneuvering the site. Additionally, users without a premium Spotify account will have access to episode excerpts. "
          stack={[
            "Node",
            "JavaScript",
            "React",
            "MaterialUI",
            "ExpressJS",
            "Figma",
            "RESTful",
            "CRUD",
          ]}
          src={takeover}
        />

        <Cards
          key={3}
          timing={2}
          heading="Mobile Detailing Service FrontEnd"
          desc="Frontend design and development for Mobile Detailing Service. Bootstrap, Figma, Adobe Photoshop/Express, and GSAP Scroll Triggers."
          stack={[
            "JavaScript",
            "React",
            "Bootstrap",
            "Adobe Photoshop",
            "Framer-Motion",
          ]}
          src={slick}
        />
      </AnimatePresence>
    </>
  );
}
