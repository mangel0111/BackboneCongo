Congo.Database = Backbone.Model.extend({
    url: function () {
        return "/mongo-api/dbs/" + this.id;
    },
    validate: function (attr) {
        if (_.isEmpty(attr.name)) {
            return "To save a database a name is need";
        }
    },
    idAttribute: "name",

});

Congo.DatabaseCollection = Backbone.Collection.extend({
    model: Congo.Database,
    url: '/mongo-api/dbs'
});

Congo.DatabaseView = Congo.ItemView.extend({
    tagName: "tr",
    template: "#database-list-template",
    events: {
        "click button": "remove",
        "click a": "showDb"
    },
    showDb: function (e) {
        e.preventDefault();
        var db = $(e.currentTarget).text();
        Congo.router.navigate(db, true);
    }

});

Congo.DatabaseListView = Congo.ListView.extend({
    tagName: "table",
    className: "table table-striped",
    ItemView: Congo.DatabaseView
});


Congo.DatabaseOptionView = Congo.View.extend({
    initialize: function () {
        this.render();
    },
    template: "#new-db-template",
    events: {
        "submit form": "addDb"
    },
    addDb: function (e) {
        e.preventDefault();
        var newDb = new Congo.Database({ name: $('#newDb').val() });
        newDb.save();
        Congo.databases.add(newDb);
    }
});

Congo.DatabaseLayoutView = Congo.Layout.extend({
    template: "#db-details-template",
    regions: {
        databaselist: "#database-list",
        databaseOptions: "#database-options"
    },
    layoutReady: function () {
        var dblistView = new Congo.DatabaseListView({ collection: this.collection });
        var optionView = new Congo.DatabaseOptionView();

        this.databaselist.append(dblistView.render().el);
        this.databaseOptions.append(optionView.render().el);
    }
});