//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const { services } = require("./data/services");

// Services list (Level 1)
router.get("/services", (req, res) => {
  res.render("services/index.html", { services });
});

// Service overview (Level 2)
router.get("/services/:serviceId", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  res.render("services/overview.html", { service, success: req.query.success });
});

// Catch-all: unbuilt edit screens
router.get("/services/:serviceId/integration/:configId/edit/:field", (req, res) => {
  res.render("not-yet-built.html");
});

// Request to go live (placeholder)
router.get("/services/:serviceId/request-go-live", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  res.render("services/request-go-live.html", { service });
});

// Edit config detail (Level 3)
router.get("/services/:serviceId/:envType/:configId/edit", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  const { envType, configId } = req.params;
  let config;
  if (envType === "production" && service.production && service.production.id === configId) {
    config = service.production;
  } else if (envType === "integration") {
    config = service.integration.find(c => c.id === configId);
  }
  if (!config) return res.redirect("/services/" + service.id);
  res.render("services/config.html", {
    service,
    envType,
    config,
    success: req.query.success,
    showChangeLink: true,
  });
});

// View config detail (Level 3)
router.get("/services/:serviceId/:envType/:configId", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  const { envType, configId } = req.params;
  let config;
  if (envType === "production" && service.production && service.production.id === configId) {
    config = service.production;
  } else if (envType === "integration") {
    config = service.integration.find(c => c.id === configId);
  }
  if (!config) return res.redirect("/services/" + service.id);
  res.render("services/config.html", {
    service,
    envType,
    config,
    success: req.query.success,
    showChangeLink: false,
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

setupKeyWarningRoutes(router);
setupKeyWarningHintRoutes(router);
setupCreateServiceIdentityFlowRoutes(router);
setupViewServiceEditableRoutes(router);
