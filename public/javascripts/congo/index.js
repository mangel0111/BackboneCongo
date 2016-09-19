Congo = {
  init: function () {

    //Data
    Congo.databases = new Congo.DatabaseCollection({});

    //Views
    Congo.breadcrumbs = new Congo.BreadcrumbView({ el: "#nav" });

    //Start
    Congo.start();
  },
  showDatabases: function () {
    var dblayout = new Congo.DatabaseLayoutView({ collection: Congo.databases });
    dblayout.render();
    $('#details').append(dblayout.el);
    Congo.databases.fetch();
  },
  start: function () {
    Congo.showDatabases();
  }
}