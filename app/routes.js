//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const {
  setupKeyWarningRoutes,
} = require("./views/create-service-key-warning/setup-routes");
const {
  setupKeyWarningHintRoutes,
} = require("./views/create-service-key-warning-hint/setup-routes");

setupKeyWarningRoutes(router);
setupKeyWarningHintRoutes(router);