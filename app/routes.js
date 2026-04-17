//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

const {
  setupKeyWarningRoutes,
} = require("./views/create-client-key-warning/setup-routes");
const {
  setupKeyWarningHintRoutes,
} = require("./views/create-client-key-warning-hint/setup-routes");
const {
  setupCreateClientIdentityFlowRoutes,
} = require("./views/create-client-identity-flow/setup-routes");
const {
  setupViewClientEditableRoutes,
} = require("./views/view-client-editable/setup-routes");
const {
  setupServiceRoutes,
} = require("./views/services/setup-routes");

setupKeyWarningRoutes(router);
setupKeyWarningHintRoutes(router);
setupCreateClientIdentityFlowRoutes(router);
setupViewClientEditableRoutes(router);

setupServiceRoutes(router);
