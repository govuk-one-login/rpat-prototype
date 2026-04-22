const { services } = require("../../data/services");

function setupNewUserServiceRoutes(router) {

    // Services list (Level 1)
    router.get("/new-user/services", (req, res) => {
        res.render("new-user/view-all-services.html", { services: [] });
    });

    router.get("/new-user/services/view-service", (req, res) => {
        const service = {
            id: "new-id",
            name: "New Service",
            description: "This is a brand new service with no clients",
            integration: null,
            production: null
        }
        res.render("new-user/view-service.html", { service, success: req.query.success });
    });

    // Service overview (Level 2)
    router.get("/new-user/services/:serviceId", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        res.render("services/view-service.html", { service, success: req.query.success });
    });

    // Catch-all: unbuilt edit screens
    router.get("/new-user/services/:serviceId/integration/:configId/edit/:field", (req, res) => {
        res.render("not-yet-built.html");
    });

    // Request to go live (placeholder)
    router.get("/new-user/services/:serviceId/request-go-live", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        res.render("services/request-go-live.html", { service });
    });

    // Edit config detail (Level 3)
    router.get("/new-user/services/:serviceId/:envType/:configId/edit", (req, res) => {
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
    router.get("/new-user/services/:serviceId/:envType/:configId", (req, res) => {
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
    router.get("/new-user/services/:serviceId/integration/:configId/compare", (req, res) => {
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
    setupNewUserServiceRoutes,
  };