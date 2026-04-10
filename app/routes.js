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

// Create service flow
router.get("/create-service/start", (req, res) => {
  res.render("create-service/start.html");
});

// Branching: auth only or identity
router.post("/create-service/type-answer", (req, res) => {
  res.redirect("/create-service/client-name");
});

// Redirect URLs: add/delete pattern
router.get("/create-service/redirect-urls", (req, res) => {
  res.render("create-service/redirect-urls.html", {
    redirectUrls: req.session.data.redirectUrls || [],
    redirectUrlTableEntries: createRedirectUrlTableEntries(req.session.data.redirectUrls || [])
  });
});

router.post("/create-service/redirect-urls", (req, res) => {
  const urls = req.session.data.redirectUrls || [];
  if (req.body["redirect-url"]) {
    urls.push(req.body["redirect-url"]);
  }
  req.session.data.redirectUrls = urls;
  res.redirect("/create-service/redirect-urls");
});

router.get("/create-service/redirect-urls/delete/:id", (req, res) => {
  const urls = req.session.data.redirectUrls || [];
  urls.splice(req.params.id, 1);
  req.session.data.redirectUrls = urls;
  res.redirect("/create-service/redirect-urls");
});

function createRedirectUrlTableEntries(urls) {
  return urls.map((url, index) => [
    { html: url.toString() },
    { html: '<a href="/create-service/redirect-urls/delete/' + index + '" class="govuk-link">Remove<span class="govuk-visually-hidden"> ' + url + '</span></a>' }
  ]);
}

// Branching: scopes → claims (identity) or review (auth only)
router.post("/create-service/scopes-answer", (req, res) => {
  if (req.session.data["service-type"] === "auth-and-identity") {
    res.redirect("/create-service/claims");
  } else {
    res.redirect("/create-service/review");
  }
});

// Review page needs redirect URLs from session
router.get("/create-service/review", (req, res) => {
  res.render("create-service/review.html", {
    redirectUrls: req.session.data.redirectUrls || []
  });
});

// Success page
router.post("/create-service/success", (req, res) => {
  res.render("create-service/success.html");
});

// Request to go live (placeholder)
router.get("/services/:serviceId/request-go-live", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  res.render("services/request-go-live.html", { service });
});

// Compare integration config with production
router.get("/services/:serviceId/integration/:configId/compare", (req, res) => {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return res.redirect("/services");
  const config = service.integration.find(c => c.id === req.params.configId);
  if (!config || !service.production) return res.redirect("/services/" + service.id);
  res.render("services/compare.html", {
    service,
    config,
    prodConfig: service.production
  });
});

// Edit routes for integration configs
const editFields = ["service-name", "scopes", "public-key-type", "redirect-urls"];

function findServiceAndConfig(req) {
  const service = services.find(s => s.id === req.params.serviceId);
  if (!service) return null;
  const config = service.integration.find(c => c.id === req.params.configId);
  if (!config) return null;
  return { service, config };
}

// Edit: service name
router.get("/services/:serviceId/integration/:configId/edit/service-name", (req, res) => {
  const found = findServiceAndConfig(req);
  if (!found) return res.redirect("/services");
  res.render("services/edit/service-name.html", {
    serviceId: req.params.serviceId,
    configId: req.params.configId,
    currentValue: found.config.serviceName
  });
});

router.post("/services/:serviceId/integration/:configId/edit/service-name", (req, res) => {
  res.redirect("/services/" + req.params.serviceId + "/integration/" + req.params.configId + "?success=Service name updated");
});

// Edit: scopes
router.get("/services/:serviceId/integration/:configId/edit/scopes", (req, res) => {
  const found = findServiceAndConfig(req);
  if (!found) return res.redirect("/services");
  res.render("services/edit/scopes.html", {
    serviceId: req.params.serviceId,
    configId: req.params.configId,
    currentValue: found.config.scopes
  });
});

router.post("/services/:serviceId/integration/:configId/edit/scopes", (req, res) => {
  res.redirect("/services/" + req.params.serviceId + "/integration/" + req.params.configId + "?success=Scopes updated");
});

// Edit: public key type
router.get("/services/:serviceId/integration/:configId/edit/public-key-type", (req, res) => {
  const found = findServiceAndConfig(req);
  if (!found) return res.redirect("/services");
  res.render("services/edit/public-key-type.html", {
    serviceId: req.params.serviceId,
    configId: req.params.configId,
    currentValue: found.config.publicKeyType,
    currentJwksUrl: found.config.jwksUrl
  });
});

router.post("/services/:serviceId/integration/:configId/edit/public-key-type", (req, res) => {
  res.redirect("/services/" + req.params.serviceId + "/integration/" + req.params.configId + "?success=Public key type updated");
});

// Edit: redirect URLs
router.get("/services/:serviceId/integration/:configId/edit/redirect-urls", (req, res) => {
  const found = findServiceAndConfig(req);
  if (!found) return res.redirect("/services");
  const urls = req.session.data.editRedirectUrls || found.config.redirectUrls.slice();
  req.session.data.editRedirectUrls = urls;
  res.render("services/edit/redirect-urls.html", {
    serviceId: req.params.serviceId,
    configId: req.params.configId,
    editRedirectUrls: urls,
    editRedirectUrlTableEntries: urls.map((url, i) => [
      { html: url },
      { html: '<a href="/services/' + req.params.serviceId + '/integration/' + req.params.configId + '/edit/redirect-urls/delete/' + i + '" class="govuk-link">Remove<span class="govuk-visually-hidden"> ' + url + '</span></a>' }
    ])
  });
});

router.post("/services/:serviceId/integration/:configId/edit/redirect-urls", (req, res) => {
  const urls = req.session.data.editRedirectUrls || [];
  if (req.body["new-redirect-url"]) {
    urls.push(req.body["new-redirect-url"]);
  }
  req.session.data.editRedirectUrls = urls;
  res.redirect("/services/" + req.params.serviceId + "/integration/" + req.params.configId + "/edit/redirect-urls");
});

router.get("/services/:serviceId/integration/:configId/edit/redirect-urls/delete/:index", (req, res) => {
  const urls = req.session.data.editRedirectUrls || [];
  urls.splice(req.params.index, 1);
  req.session.data.editRedirectUrls = urls;
  res.redirect("/services/" + req.params.serviceId + "/integration/" + req.params.configId + "/edit/redirect-urls");
});

// Catch-all: unbuilt edit screens
router.get("/services/:serviceId/integration/:configId/edit/:field", (req, res) => {
  res.render("not-yet-built.html");
});

// Config detail (Level 3)
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
