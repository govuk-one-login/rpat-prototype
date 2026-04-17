const { services } = require("../../data/services");

function setupServiceRoutes(router) {

    // Services list (Level 1)
    router.get("/services", (req, res) => {
        res.render("services/view-all-services.html", { services });
    });

    // Service overview (Level 2)
    router.get("/services/:serviceId", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        res.render("services/view-service.html", { service, success: req.query.success });
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
        res.render("services/view-client.html", {
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
        res.render("services/view-client.html", {
            service,
            envType,
            config,
            success: req.query.success,
            showChangeLink: false,
        });
    });

    // Compare integration config with production
    router.get("/services/:serviceId/integration/:configId/compare", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        const config = service.integration.find(c => c.id === req.params.configId);
        if (!config || !service.production) return res.redirect("/services/" + service.id);
        res.render("services/compare-clients.html", {
            service,
            config,
            prodConfig: service.production
        });
    });
}

module.exports = {
    setupServiceRoutes,
  };