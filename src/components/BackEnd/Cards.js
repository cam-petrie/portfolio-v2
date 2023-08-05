import * as React from "react";
import Cards from "../ProjectCards/Cards";
import authentication from "../../images/blog-authentication.png";
import mongo from "../../images/mongodb.png";
import takeoverblog from "../../images/takeover_blog.png";
import tableau from "../../images/tableau.png";

export default function BackEnd() {
  return (
    <>
      <Cards
        key={1}
        timing={0}
        heading="MongoDB Post Storage System/REST API"
        desc="Blog post storage system using MERN stack. Offers a robust and scalable solution for managing and organizing blog content. Employed Mongoose (object modeling tool for MongoDB) to simplify data schema definition and facilitate interactions with the database."
        stack={[
          "MongoDB",
          "NoSQL Database",
          "Node",
          "Mongoose",
          "ExpressJS",
          "REST API",
          "CRUD",
        ]}
        src={mongo}
      />
      <Cards
        key={2}
        timing={1}
        heading="User Authentication For Blog"
        desc="Leveraged Firebase's authentication services to seamlessly manage user sign-up, login, and password recovery process. Integrated Firebase's Authentication SDK into React application ensuring smooth onboarding and sign-in procedure. "
        stack={["Node", "Firebase", "Authorization", "APIs"]}
        src={authentication}
      />
      <Cards
        key={3}
        timing={2}
        heading="SQL Data Exploration"
        desc="Data exploration, cleaning, and visualization using NVSS Heart Disease data from the state of NY (2021)"
        stack={["MS SQL Server", "Microsoft Excel", "Tableau"]}
        src={tableau}
      />
    </>
  );
}
