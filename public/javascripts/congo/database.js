Congo.Database = Backbone.Model.extend({

});

Congo.Databases = Backbone.Collection.extend({
    model: Congo.Database,
    url: '/mongo-api/dbs'
});

Congo.DatabaseView = Backbone.View.extend({
    tagName: "tr",
    events: {
        "click a": "sayHello",
        "click button": "sayHello"
    },
    sayHello: function () {
        alert("This is just a test!");
    },
    render: function () {
        var template = $('#database-list-template').html();
        var compiled = _.template(template, { name: "Db Name" });
        $(this.el).html(compiled);
        return this;
    }
});

Congo.DatabaseListView = Backbone.View.extend({
    tagName: "table",
    className: "table table-striped",
    render: function () {
        var dbList = [];
        for (var i = 0; i <= 5; i++) {
            var itemView = new Congo.DatabaseView();
            //  $(this.el).append(itemView.render().el);
            dbList.push(itemView.render().el);
        }
        $(this.el).html(dbList);
        // return this;
        $('#database-list').html(this.el);
    }
});