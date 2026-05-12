// Migration journey routes

function setupMigrateRoutes(router) {

  // Entry point - GET
  router.get("/migrate/enter-client-id", (req, res) => {
    res.render("migrate/enter-client-id.html", {
      error: null
    });
  });

  // Entry point - POST (simulate email match lookup)
  router.post("/migrate/enter-client-id", (req, res) => {
    const clientId = req.body.clientId;

    // Simulate validation
    if (!clientId || clientId.trim() === "") {
      return res.render("migrate/enter-client-id.html", {
        error: "Enter a client ID",
        "clientId": clientId
      });
    }

    // Simulate known states for prototype testing:
    // "already-claimed" triggers the already claimed error
    if (clientId === "already-claimed") {
      return res.redirect("/migrate/already-claimed");
    }

    // "not-found" triggers the not found page
    if (clientId === "not-found") {
      return res.redirect("/migrate/cannot-find-client");
    }

    // Check for duplicate
    req.session.data = req.session.data || {};
    const claimed = req.session.data["claimed-clients"] || [];
    if (claimed.some(c => c.clientId === clientId)) {
      return res.render("migrate/enter-client-id.html", {
        error: "You have already added this client ID",
        "clientId": clientId
      });
    }

    // Happy path - any other value proceeds to confirm
    req.session.data["migrate-client-id"] = clientId;
    res.redirect("/migrate/confirm-claim");
  });

  // Confirm claim - GET
  router.get("/migrate/confirm-claim", (req, res) => {
    res.render("migrate/confirm-claim.html");
  });

  // Confirm claim - POST
  router.post("/migrate/confirm-claim", (req, res) => {
    req.session.data = req.session.data || {};
    req.session.data["claimed-clients"] = req.session.data["claimed-clients"] || [];
    req.session.data["claimed-clients"].push({
      clientId: req.session.data["migrate-client-id"] || "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      clientName: "Apply for a county court judgment",
      environment: "Integration"
    });
    res.redirect("/migrate/add-another");
  });

  // Add another - GET
  router.get("/migrate/add-another", (req, res) => {
    res.render("migrate/add-another.html");
  });

  // Add another - POST
  router.post("/migrate/add-another", (req, res) => {
    if (req.body.addAnother === "yes") {
      return res.redirect("/migrate/enter-client-id");
    }
    res.redirect("/migrate/claimed");
  });

  // Success
  router.get("/migrate/claimed", (req, res) => {
    const claimedClients = (req.session.data && req.session.data["claimed-clients"]) || [];
    res.render("migrate/claimed.html", { claimedClients });
    // Reset for next time
    if (req.session.data) {
      req.session.data["claimed-clients"] = [];
    }
  });

  // Cannot find client ID
  router.get("/migrate/cannot-find-client", (req, res) => {
    res.render("migrate/cannot-find-client.html");
  });

  // Already claimed
  router.get("/migrate/already-claimed", (req, res) => {
    res.render("migrate/already-claimed.html");
  });
}

module.exports = { setupMigrateRoutes };
