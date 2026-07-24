//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

const {
  setupServiceRoutes,
} = require("./views/services/setup-routes");
const {
  setupNewUserServiceRoutes,
} = require("./views/new-user/setup-routes");
const { 
  setupMigrateRoutes,
} = require("./views/migrate/setup-routes");

setupServiceRoutes(router);
setupNewUserServiceRoutes(router);
setupMigrateRoutes(router);
