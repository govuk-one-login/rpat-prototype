//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const { services } = require("./data/services");

// Services list (Level 1)
router.get("/services", (req, res) => {
  res.render("services/list.html", { services });
});

// Service overview (Level 2)
router.get("/services/:serviceId", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  res.render("services/overview.html", { service, success: req.query.success });
});

// Environment config (Level 3)
router.get("/services/:serviceId/:envName", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  const env = service.environments[req.params.envName];
  if (!env) return res.redirect("/services/" + service.id);
  res.render("services/environment.html", {
    service,
    envName: req.params.envName,
    config: env.config,
    success: req.query.success
  });
});
const {
  setupKeyWarningRoutes,
} = require("./views/create-service-key-warning/setup-routes");
const {
  setupKeyWarningHintRoutes,
} = require("./views/create-service-key-warning-hint/setup-routes");
const {
  setupCreateServiceIdentityFlowRoutes,
} = require("./views/create-service-identity-flow/setup-routes");
const {
  setupViewServiceEditableRoutes,
} = require("./views/view-service-editable/setup-routes");
const {
  setupViewServiceEditableWizardRoutes,
} = require("./views/view-service-editable-wizard/setup-routes");

setupKeyWarningRoutes(router);
setupKeyWarningHintRoutes(router);
setupCreateServiceIdentityFlowRoutes(router);
setupViewServiceEditableRoutes(router);
setupViewServiceEditableWizardRoutes(router);
