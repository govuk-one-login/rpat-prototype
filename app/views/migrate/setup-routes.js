// Migration journey routes

// Mock data: clients associated with emails in the old SSE tool
const sseClients = {
  "sarah.thompson@education.gov.uk": [
    {
      clientId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      clientName: "Apply for a county court judgment",
      environment: "Integration",
      redirectUrl: "https://apply.example.justice.gov.uk/callback"
    },
    {
      clientId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      clientName: "Apply for a county court judgment",
      environment: "Production",
      redirectUrl: "https://apply.justice.gov.uk/callback"
    },
    {
      clientId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
      clientName: "Register trainee teachers",
      environment: "Integration",
      redirectUrl: "https://dev.register-trainee-teachers.education.gov.uk/callback"
    }
  ]
};

function setupMigrateRoutes(router) {

  // Email journey - automatically finds clients for the logged-in user
  router.get("/migrate/find-by-email", (req, res) => {
    const userEmail = "sarah.thompson@education.gov.uk"; // inferred from login
    const foundClients = sseClients[userEmail] || [];

    if (foundClients.length === 0) {
      return res.redirect("/migrate/no-clients-found");
    }

    req.session.data = req.session.data || {};
    req.session.data["found-clients"] = foundClients;
    res.redirect("/migrate/select-clients");
  });

  // Select clients - GET
  router.get("/migrate/select-clients", (req, res) => {
    const foundClients = (req.session.data && req.session.data["found-clients"]) || [];
    res.render("migrate/select-clients.html", { foundClients, error: null });
  });

  // Select clients - POST
  router.post("/migrate/select-clients", (req, res) => {
    let selected = req.body.clients;
    const foundClients = (req.session.data && req.session.data["found-clients"]) || [];

    if (!selected) {
      return res.render("migrate/select-clients.html", {
        foundClients,
        error: "Select at least one integration to claim"
      });
    }

    // Normalise to array
    if (!Array.isArray(selected)) selected = [selected];

    const claimed = foundClients.filter(c => selected.includes(c.clientId));
    req.session.data["email-claimed-clients"] = claimed;
    res.redirect("/migrate/email-claimed");
  });

  // Email claimed success
  router.get("/migrate/email-claimed", (req, res) => {
    const claimedClients = (req.session.data && req.session.data["email-claimed-clients"]) || [];
    res.render("migrate/email-claimed.html", { claimedClients });
  });

  // No clients found
  router.get("/migrate/no-clients-found", (req, res) => {
    res.render("migrate/no-clients-found.html");
  });

  // Client ID journey - Entry point - GET
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
      clientName: "Apply for a county court judgment"
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
