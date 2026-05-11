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

    // Happy path - any other value proceeds to confirm
    // Store in session for confirm page
    req.session.data = req.session.data || {};
    req.session.data["migrate-client-id"] = clientId;
    res.redirect("/migrate/confirm-claim");
  });

  // Confirm claim - GET
  router.get("/migrate/confirm-claim", (req, res) => {
    res.render("migrate/confirm-claim.html");
  });

  // Confirm claim - POST
  router.post("/migrate/confirm-claim", (req, res) => {
    res.redirect("/migrate/claimed");
  });

  // Success
  router.get("/migrate/claimed", (req, res) => {
    res.render("migrate/claimed.html");
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
