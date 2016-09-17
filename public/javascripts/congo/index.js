Congo = {
  init: function () {

    //Data
    Congo.databases = new Congo.DatabaseCollection();

    //Views
    Congo.breadcrumbs = new Congo.BreadcrumbView({ el: "#breadcrumbs" });
    Congo.databaseList = new Congo.DatabaseListView({ collection: Congo.databases });

    //Start
    Congo.start();
  },
  start: function () {
    Congo.databases.fetch();
  }
}