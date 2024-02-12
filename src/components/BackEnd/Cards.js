import * as React from "react";
import Cards from "../ProjectCards/Cards";
import authentication from "../../images/blog-authentication.png";
import mongo from "../../images/mongodb.png";
import blockchain from "../../images/blockchain.png";
import db from "../../images/db_migration.png";
import { Grid } from "@mui/material";

export default function BackEnd() {
  return (
    <>
      {" "}
      <Grid container spacing={1} p={0}>
        <Cards
          key={1}
          link={false}
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
          key={5}
          link="https://github.com/Peach97/blockchain-creator"
          timing={2}
          heading="Blockchain Creator"
          desc="Proof of work consens mechanism. Established network topology to facilitate communication between nodes. Defined numbers and roles of nodes in the network (miners & validators); generated first block."
          stack={["Java", "Kotlin", "Blockchain", "Git"]}
          src={blockchain}
        />

        <Cards
          key={7}
          link="https://github.com/Peach97/database-migration"
          timing={4}
          heading="Grocery Store DB Migration and Integration Project"
          desc="Performed advanced PostgreSQL DB migrations using Flyway to ensure proper tracking of DB schema changes and versioning. Optimized using indexing techniques, as well as data structures such as linked lists, hash tables, stacks, and queues. Extensively tested with JUnit to reduce DB risks, measure performance, and ensure data consistency.
          "
          stack={[
            "Java",
            "Kotlin",
            "JUnit",
            "PostgreSQL",
            "Flyway",
            "Data Structures",
          ]}
          src={db}
        />
        <Cards
          key={2}
          link="https://github.com/Peach97/TakeoverPods"
          timing={5}
          heading="User Authentication For Blog"
          desc="Leveraged Firebase's authentication services to seamlessly manage user sign-up, login, and password recovery process. Integrated Firebase's Authentication SDK into React application ensuring smooth onboarding and sign-in procedure. "
          stack={["Node", "Firebase", "Authorization", "APIs"]}
          src={authentication}
        />
      </Grid>
    </>
  );
}
