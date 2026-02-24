function setupRoutes(router) {
  // Add your routes here
  router.get("/create-service-redirect-url-table/redirect-urls", (req, res) => {
    res.render("/create-service-redirect-url-table/redirect-urls.html", {
      redirectUrls: req.cookies.redirectUrls,
      redirectUrlTableEntries: req.cookies.redirectUrlTableEntries,
    });
  });

  router.post(
    "/create-service-redirect-url-table/redirect-urls",
    (req, res) => {
      const existingUrls = req.cookies.redirectUrls || [];
      let allUrls = existingUrls;

      if (req.body.redirectUrl) {
        allUrls.push(req.body.redirectUrl);
      }

      res.cookie("redirectUrls", allUrls);
      res.cookie("redirectUrlTableEntries", createTableEntries(allUrls));
      res.redirect("/create-service-redirect-url-table/redirect-urls");
    }
  );

  router.get(
    "/create-service-redirect-url-table/redirect-urls/delete/:id",
    (req, res) => {
      let allUrls = req.cookies.redirectUrls;
      allUrls.splice(req.params.id, 1);
      res.cookie("redirectUrls", allUrls);
      res.cookie("redirectUrlTableEntries", createTableEntries(allUrls));
      res.redirect("/create-service-redirect-url-table/redirect-urls");
    }
  );

  router.get("/create-service-redirect-url-table/confirm", (req, res) => {
    const redirectUrls = req.cookies.redirectUrls;
    res.render("/create-service-redirect-url-table/confirm.html", {
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
            '<a href="/create-service-redirect-url-table/redirect-urls/delete/' +
            index +
            '">Delete</a>',
        },
      ];
    });
  };
}

module.exports = {
  setupRoutes,
};
