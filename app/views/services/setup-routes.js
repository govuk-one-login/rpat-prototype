const { services } = require("../../data/services");
const { 
  newIdentityClientDefaults, 
  generateClientId, 
  countIncompleteFields, 
  getIncompleteFields 
} = require("../../data/client-config");

function setupServiceRoutes(router) {

    // Helper to get or initialize session clients
    function getSessionClients(req, serviceId) {
        req.session.data = req.session.data || {};
        req.session.data.clients = req.session.data.clients || {};
        req.session.data.clients[serviceId] = req.session.data.clients[serviceId] || [];
        return req.session.data.clients[serviceId];
    }

    // Helper to find a client (session or mock data)
    function findClient(req, serviceId, clientId) {
        // Check session clients first
        const sessionClients = getSessionClients(req, serviceId);
        const sessionClient = sessionClients.find(c => c.id === clientId);
        if (sessionClient) return { client: sessionClient, isSession: true };
        
        // Check mock data
        const service = services.find(s => s.id === serviceId);
        if (service) {
            const mockClient = service.integration.find(c => c.id === clientId);
            if (mockClient) return { client: mockClient, isSession: false };
        }
        return { client: null, isSession: false };
    }

    // Services list (Level 1)
    router.get("/services", (req, res) => {
        res.render("services/view-all-services.html", { services });
    });

    // Service overview (Level 2)
    router.get("/services/:serviceId", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        // Merge session clients with mock data
        const sessionClients = getSessionClients(req, service.id);
        const allIntegrationClients = [...service.integration, ...sessionClients];
        
        res.render("services/view-service.html", { 
            service: { ...service, integration: allIntegrationClients }, 
            success: req.query.success 
        });
    });

    // Create client - form
    router.get("/services/:serviceId/create-client", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        res.render("services/create-client.html", { service });
    });

    // Create client - submit
    router.post("/services/:serviceId/create-client", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        const { clientName, clientType } = req.body;
        
        // Auth-only clients go to 404 as per requirements
        if (clientType === "auth") {
            return res.redirect("/not-yet-built");
        }
        
        // Create new identity client
        const clientId = generateClientId();
        const newClient = {
            ...newIdentityClientDefaults,
            id: clientId.replace(/[^a-z0-9-]/g, ''),
            clientId: clientId,
            clientName: clientName || "New client",
            clientType: "identity"
        };
        
        // Store in session
        const sessionClients = getSessionClients(req, service.id);
        sessionClients.push(newClient);
        
        res.render("services/client-created.html", { service, client: newClient });
    });

    // Client overview (new flow)
    router.get("/services/:serviceId/integration/:clientId", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        const { client, isSession } = findClient(req, service.id, req.params.clientId);
        
        // If not found in session, check if it's a mock client and redirect to old view
        if (!client) return res.redirect("/services/" + service.id);
        
        // For mock clients, use the old view
        if (!isSession) {
            return res.render("services/view-client.html", {
                service,
                envType: "integration",
                config: client,
                success: req.query.success,
                showChangeLink: true
            });
        }
        
        // For session clients, use new overview
        const incompleteFields = getIncompleteFields(client);
        res.render("services/client-overview.html", { 
            service, 
            client,
            incompleteCount: incompleteFields.length,
            incompleteFields: incompleteFields,
            showErrors: req.query.showErrors === "true",
            success: req.query.success
        });
    });

    // Activate client
    router.post("/services/:serviceId/integration/:clientId/activate", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        const { client } = findClient(req, service.id, req.params.clientId);
        if (!client) return res.redirect("/services/" + service.id);
        
        const incompleteFields = getIncompleteFields(client);
        
        if (incompleteFields.length > 0) {
            // Show errors
            return res.redirect("/services/" + service.id + "/integration/" + req.params.clientId + "?showErrors=true");
        }
        
        // Activate the client
        client.isActive = true;
        
        res.render("services/client-activated.html", { service, client });
    });

    // Edit screens for new clients
    router.get("/services/:serviceId/integration/:clientId/edit/:field", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        const { client } = findClient(req, service.id, req.params.clientId);
        if (!client) return res.redirect("/services/" + service.id);
        
        const field = req.params.field;
        const templatePath = "services/edit/" + field + ".html";
        
        // Check if template exists by trying to render it
        res.render(templatePath, { service, client }, (err, html) => {
            if (err) {
                // Fall back to not-yet-built for unimplemented edit screens
                return res.render("not-yet-built.html");
            }
            res.send(html);
        });
    });

    // Save redirect URLs
    router.post("/services/:serviceId/integration/:clientId/edit/redirect-urls", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        const { client } = findClient(req, service.id, req.params.clientId);
        if (!client) return res.redirect("/services/" + service.id);
        
        // Handle array or single value
        let urls = req.body.redirectUrls;
        if (!Array.isArray(urls)) urls = [urls];
        client.redirectUrls = urls.filter(u => u && u.trim() !== "");
        
        res.redirect("/services/" + service.id + "/integration/" + req.params.clientId + "?success=Redirect URIs updated");
    });

    // Save authentication method
    router.post("/services/:serviceId/integration/:clientId/edit/public-key-type", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        const { client } = findClient(req, service.id, req.params.clientId);
        if (!client) return res.redirect("/services/" + service.id);
        
        client.publicKeyType = req.body.publicKeyType;
        if (req.body.publicKeyType === "JWKS URL") {
            client.jwksUrl = req.body.jwksUrl;
            client.publicKey = "configured";
        } else if (req.body.publicKeyType === "Fixed public key") {
            client.publicKey = req.body.publicKey || "configured";
            client.jwksUrl = null;
        } else if (req.body.publicKeyType === "Client secret") {
            client.publicKey = req.body.clientSecret || "configured";
            client.jwksUrl = null;
        }
        
        res.redirect("/services/" + service.id + "/integration/" + req.params.clientId + "?success=Authentication method updated");
    });

    // Save scopes
    router.post("/services/:serviceId/integration/:clientId/edit/scopes", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        
        const { client } = findClient(req, service.id, req.params.clientId);
        if (!client) return res.redirect("/services/" + service.id);
        
        let scopes = req.body.scopes;
        if (!Array.isArray(scopes)) scopes = scopes ? [scopes] : [];
        // Always include openid
        if (!scopes.includes("openid")) scopes.unshift("openid");
        client.scopes = scopes;
        
        res.redirect("/services/" + service.id + "/integration/" + req.params.clientId + "?success=Scopes updated");
    });

    // Team members
    router.get("/services/:serviceId/team-members", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        const invitedEmail = req.session.data && req.session.data["invited-email-" + service.id];
        res.render("services/team-members.html", { service, success: req.query.success, invitedEmail });
    });

    // Invite team member - form
    router.get("/services/:serviceId/team-members/invite", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        res.render("services/invite-team-member.html", { service });
    });

    // Invite team member - submit
    router.post("/services/:serviceId/team-members/invite", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        const email = req.body["invite-email"];
        req.session.data = req.session.data || {};
        req.session.data["invited-email-" + service.id] = email;
        res.render("services/invite-sent.html", { service, invitedEmail: email });
    });

    // Remove team member - confirm page
    router.get("/services/:serviceId/team-members/:memberIndex/remove", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        const memberIndex = parseInt(req.params.memberIndex);
        const member = service.teamMembers[memberIndex];
        if (!member) return res.redirect("/services/" + service.id + "/team-members");
        res.render("services/remove-team-member.html", { service, member, memberIndex });
    });

    // Remove team member - submit
    router.post("/services/:serviceId/team-members/:memberIndex/remove", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        const memberIndex = parseInt(req.params.memberIndex);
        const member = service.teamMembers[memberIndex];
        if (!member) return res.redirect("/services/" + service.id + "/team-members");
        const name = member.name;
        service.teamMembers.splice(memberIndex, 1);
        res.redirect("/services/" + service.id + "/team-members?success=" + encodeURIComponent(name + " has been removed"));
    });

    // Invite team member - confirmation (GET for direct linking)
    router.get("/services/:serviceId/team-members/invite/sent", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        const invitedEmail = (req.session.data && req.session.data["invited-email-" + service.id]) || "example@email.gov.uk";
        res.render("services/invite-sent.html", { service, invitedEmail });
    });

    // Accept invite
    router.get("/accept-invite", (req, res) => {
        res.render("accept-invite/index.html");
    });

    router.get("/accept-invite/confirm", (req, res) => {
        res.render("accept-invite/confirmed.html");
    });

    // Request to go live (placeholder)
    router.get("/services/:serviceId/request-go-live", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        res.render("services/request-go-live.html", { service });
    });

    // Edit config detail (Level 3) - for mock clients
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

    // View config detail (Level 3) - for production
    router.get("/services/:serviceId/production/:configId", (req, res) => {
        const service = services.find(s => s.id === req.params.serviceId);
        if (!service) return res.redirect("/services");
        const { configId } = req.params;
        let config;
        if (service.production && service.production.id === configId) {
            config = service.production;
        }
        if (!config) return res.redirect("/services/" + service.id);
        res.render("services/view-client.html", {
            service,
            envType: "production",
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
