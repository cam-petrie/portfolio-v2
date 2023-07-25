import * as React from "react";
import Cards from "../ProjectCards/Cards";
import portfolio from "../../images/portfolio-homepage.png";
import slick from "../../images/slicknspan.png";
import takeover from "../../images/Takeover.png";
import takeoverblog from "../../images/takeover_blog.png";

export default function FrontEnd() {
  return (
    <>
      <Cards
        heading="Portfolio V1"
        desc="teeeessst"
        stack={["Node", "JavaScript", "Bootstrap", "etc."]}
        src={portfolio}
      />
      <Cards
        heading="Slick N' Span"
        desc="teeeessst"
        stack={["Node", "JavaScript", "Bootstrap", "etc."]}
        src={slick}
      />
      <Cards
        heading="Spotify API App"
        desc="teeeessst"
        stack={["Node", "JavaScript", "Bootstrap", "etc."]}
        src={takeover}
      />
      <Cards
        heading="CRUD Application"
        desc="teeeessst"
        stack={["Node", "JavaScript", "Bootstrap", "etc."]}
        src={takeoverblog}
      />
    </>
  );
}
