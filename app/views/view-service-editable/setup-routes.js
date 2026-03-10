function setupViewServiceEditableRoutes(router) {
  setupTableRoutesForUrl(router, "/view-service-editable/edit-redirect-urls");
  setupTableRoutesForUrl(router, "/view-service-editable/edit-back-channel-logout-urls");
  setupTableRoutesForUrl(router, "/view-service-editable/edit-contacts");
  setupTableRoutesForUrl(router, "/view-service-editable/edit-post-logout-redirect-urls");
}

function setupTableRoutesForUrl(router, url) {
  // Add your routes here
  router.get(url, (req, res) => {
    res.render(url + ".html", {
      tableList: req.cookies.tableList,
      tableEntries: req.cookies.tableEntries,
    });
  });

  router.post(
    url,
    (req, res) => {
      const existingTableList = req.cookies.tableList || [];
      let allTableList = existingTableList;

      if (req.body.newTableItem) {
        allTableList.push(req.body.newTableItem);
      }

      res.cookie("tableList", allTableList);
      res.cookie("tableEntries", createTableEntries(allTableList));
      res.redirect(url);
    }
  );

  router.get(
    url + "/delete/:id",
    (req, res) => {
      let tableList = req.cookies.tableList;
      tableList.splice(req.params.id, 1);
      res.cookie("tableList", tableList);
      res.cookie("tableEntries", createTableEntries(tableList));
      res.redirect(url);
    }
  );

  const createTableEntries = (tableList) => {
    return tableList.map((item, index) => {
      return [
        {
          html: item.toString(),
        },
        {
          html:
            '<a href="' + url + '/delete/' +
            index +
            '">Delete</a>',
        },
      ];
    });
  };
}

module.exports = {
  setupViewServiceEditableRoutes,
};
