const express = require("express");
// const authRoute = require('./auth.route');
const userRoute = require("./user.route");
const roleRoute = require("./role.route");
const agentRoute = require("./agent.route");
const filterRoute = require("./filter.route");
const propertyRoute = require("./property.route");
const docsRoute = require("./docs.route");
const uploadRoute = require("./upload.route");
const inquiryRoute = require("./inquiry.route");
const blogRoute = require("./blog.route");
const pressRoute = require("./press.route");
const reportRoute = require("./report.route")
const router = express.Router();

const defaultRoutes = [
  {
    path: "/docs",
    route: docsRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/role",
    route: roleRoute,
  },
  {
    path: "/agent",
    route: agentRoute,
  },
  {
    path: "/filter",
    route: filterRoute,
  },
  {
    path: "/property",
    route: propertyRoute,
  },
  {
    path: "/upload",
    route: uploadRoute,
  },
  {
    path: "/inquiry",
    route: inquiryRoute,
  },
  {
    path: "/press",
    route: pressRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  }, {
    path: "/report",
    route: reportRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
