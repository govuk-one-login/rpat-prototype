function setupKeyWarningHintRoutes(router) {
  // Add your routes here
  router.get("/create-client-key-warning-hint/redirect-urls", (req, res) => {
    res.render("/create-client-key-warning-hint/redirect-urls.html", {
      redirectUrls: req.cookies.redirectUrls,
      redirectUrlTableEntries: req.cookies.redirectUrlTableEntries,
    });
  });

  router.post(
    "/create-client-key-warning-hint/redirect-urls",
    (req, res) => {
      const existingUrls = req.cookies.redirectUrls || [];
      let allUrls = existingUrls;

      if (req.body.redirectUrl) {
        allUrls.push(req.body.redirectUrl);
      }

      res.cookie("redirectUrls", allUrls);
      res.cookie("redirectUrlTableEntries", createTableEntries(allUrls));
      res.redirect("/create-client-key-warning-hint/redirect-urls");
    }
  );

  router.get(
    "/create-client-key-warning-hint/redirect-urls/delete/:id",
    (req, res) => {
      let allUrls = req.cookies.redirectUrls;
      allUrls.splice(req.params.id, 1);
      res.cookie("redirectUrls", allUrls);
      res.cookie("redirectUrlTableEntries", createTableEntries(allUrls));
      res.redirect("/create-client-key-warning-hint/redirect-urls");
    }
  );

  router.get("/create-client-key-warning-hint/confirm", (req, res) => {
    const redirectUrls = req.cookies.redirectUrls;
    res.render("/create-client-key-warning-hint/confirm.html", {
      redirectUrls: redirectUrls,
    });
  });
  const createTableEntries = (allUrls) => {
    return allUrls.map((url, index) => {
      return [
        {
          html: url.toString(),
        },
        {
          html:
            '<a href="/create-client-key-warning-hint/redirect-urls/delete/' +
            index +
            '">Delete</a>',
        },
      ];
    });
  };
}

module.exports = {
  setupKeyWarningHintRoutes,
};
