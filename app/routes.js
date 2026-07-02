//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

const {
  setupCreateClientIdentityFlowRoutes,
} = require("./views/create-client-identity-flow/setup-routes");
const {
  setupViewClientEditableRoutes,
} = require("./views/view-client-editable/setup-routes");
const {
  setupServiceRoutes,
} = require("./views/services/setup-routes");
const {
  setupNewUserServiceRoutes,
} = require("./views/new-user/setup-routes");
const { 
  setupMigrateRoutes,
} = require("./views/migrate/setup-routes");

setupCreateClientIdentityFlowRoutes(router);
setupViewClientEditableRoutes(router);
setupServiceRoutes(router);
setupNewUserServiceRoutes(router);
setupMigrateRoutes(router);
