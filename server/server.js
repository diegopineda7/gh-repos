const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");

const CLIENT_ID = "8637cd95921dc6705f9d";
const CLIENT_SECRET = "78ca5c7089e51577b20e59bf3dbc107c47aef08f";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async (req, res) => {
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.get("/getUserData", async (req, res) => {
  const body = {
    query: `query {
      viewer {
        name
        login
        avatarUrl
        url
      }
    }`,
  };
  await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.get("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.get("/getRepos", async (req, res) => {
  const body = {
    query: `query {
      viewer {
      repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes{
          id
          name
            name
            url
            primaryLanguage {
                name
            }
            visibility
          }
        }
     }
    }`,
  };
  await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.get("Authorization"),
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.listen(4000, () => console.log("CORS server running on port 4000"));
