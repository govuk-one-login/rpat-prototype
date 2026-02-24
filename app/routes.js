//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const {
  setupRoutes,
} = require("./views/create-service-redirect-url-table/setup-routes");

setupRoutes(router);
