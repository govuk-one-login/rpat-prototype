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
  res.redirect("/create-service/key-type");
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
