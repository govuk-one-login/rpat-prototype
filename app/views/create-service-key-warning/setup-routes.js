function setupKeyWarningRoutes(router) {
  // Add your routes here
  router.get("/create-service-key-warning/redirect-urls", (req, res) => {
    res.render("/create-service-key-warning/redirect-urls.html", {
      redirectUrls: req.cookies.redirectUrls,
      redirectUrlTableEntries: req.cookies.redirectUrlTableEntries,
    });
  });

  router.post(
    "/create-service-key-warning/redirect-urls",
    (req, res) => {
      const existingUrls = req.cookies.redirectUrls || [];
      let allUrls = existingUrls;

      if (req.body.redirectUrl) {
        allUrls.push(req.body.redirectUrl);
      }

      res.cookie("redirectUrls", allUrls);
      res.cookie("redirectUrlTableEntries", createTableEntries(allUrls));
      res.redirect("/create-service-key-warning/redirect-urls");
    }
  );

  router.get(
    "/create-service-key-warning/redirect-urls/delete/:id",
    (req, res) => {
      let allUrls = req.cookies.redirectUrls;
      allUrls.splice(req.params.id, 1);
      res.cookie("redirectUrls", allUrls);
      res.cookie("redirectUrlTableEntries", createTableEntries(allUrls));
      res.redirect("/create-service-key-warning/redirect-urls");
    }
  );

  router.get("/create-service-key-warning/confirm", (req, res) => {
    const redirectUrls = req.cookies.redirectUrls;
    res.render("/create-service-key-warning/confirm.html", {
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
            '<a href="/create-service-key-warning/redirect-urls/delete/' +
            index +
            '">Delete</a>',
        },
      ];
    });
  };
}

module.exports = {
  setupKeyWarningRoutes,
};
