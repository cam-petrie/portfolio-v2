import * as React from "react";
import Cards from "../ProjectCards/Cards";
import portfolio from "../../images/portfolio-homepage.png";
import slick from "../../images/slicknspan.png";
import takeover from "../../images/Takeover.png";
import takeoverblog from "../../images/takeover_blog.png";

export default function BackEnd() {
  return (
    <>
      <Cards
        key={1}
        timing={0}
        heading="Test"
        desc="TEEEEEEESSTTTTTT"
        stack={[
          "Node",
          "JavaScript",
          "Three,js",
          "WebGL",
          "Next.js",
          "Blender 3D",
        ]}
        src={portfolio}
      />
      <Cards
        key={2}
        timing={1}
        heading="Test Test"
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
        heading="CRUD Application"
        desc="CRUD capable application utilizing RESTful services allowing bloggers to create, update, and delete posts following user authentication in Firebase. Posts are stored in MongoDB and customized filtering allows readers to sort by, article popularity, recency, and topic."
        stack={["Node", "JavaScript", "Bootstrap", "etc."]}
        src={takeoverblog}
      />
      <Cards
        key={4}
        timing={3}
        heading="Slick N' Span"
        desc="Frontend design and development for Mobile Detailing Service. Bootstrap, Figma, Adobe Photoshop/Express, and GSAP Scroll Triggers."
        stack={["Node", "JavaScript", "Bootstrap", "etc."]}
        src={slick}
      />
    </>
  );
}
