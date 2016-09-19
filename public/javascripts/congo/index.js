Congo = {
  init: function () {
    //router
    Congo.router = new Congo.Router();

    //Data
    Congo.databases = new Congo.DatabaseCollection();
    Congo.currentCollection = new Congo.MongoCollections();

    //Views
    Congo.breadcrumbs = new Congo.BreadcrumbView({ el: "#nav" });
    Congo.collectionLayout = new Congo.CollectionLayoutView({ collection: Congo.currentCollection });
    Congo.dblayout = new Congo.DatabaseLayoutView({ collection: Congo.databases });

    //App Layout
    Congo.appLayout = new Congo.AppLayout({
      el: "#app",
      detailRegion: "#details"
    });
  },
  start: function () {
    //Initialize the app
    Congo.init();

    //for routing purposes
    Backbone.history.start();
  }
}

Congo.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    ":db": "showDatabase"
  },
  showDatabase: function (db) {
    Congo.currentDatabase = db;
    Congo.appLayout.renderDetails(Congo.collectionLayout);
    Congo.currentCollection.fetch();
  },
  index: function () {
    Congo.appLayout.renderDetails(Congo.dblayout);
    Congo.databases.fetch();
  }
});