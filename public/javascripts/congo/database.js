Congo.Database = Backbone.Model.extend({
    url: function () { 
        return "/mongo-api/dbs/"+this.id;
    },
    idAttribute: "name"
});

Congo.DatabaseCollection = Backbone.Collection.extend({
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
        var compiled = _.template(template, this.model.attributes);
        $(this.el).html(compiled);
        return this;
    }
});

Congo.DatabaseListView = Backbone.View.extend({
    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.render, this);
        this.collection.bind("remove", this.render, this);
        this.renderOptionView();
    },
    tagName: "table",
    className: "table table-striped",
    renderOptionView: function () {
        var optionView = new Congo.DatabaseOptionView({ el: "#db-options" });
    },
    render: function () {
        var dbList = [];
        this.collection.each(function (item) {
            var itemView = new Congo.DatabaseView({ model: item });
            dbList.push(itemView.render().el);
        });
        $(this.el).html(dbList);
        // return this;
        $('#database-list').html(this.el);
    }
});


Congo.DatabaseOptionView = Backbone.View.extend({
    initialize: function () {
        this.render();
    },
    events: {
        "submit form": "addDb"
    },
    addDb: function (e) {
        e.preventDefault();
        var newDb = new Congo.Database({ name: $('#newDb').val() });
        console.log(newDb);
    },
    render: function () {
        var source = $('#new-db-template').html();
        var compiled = _.template(source);
        this.$el.html(compiled);
        return this;
    }

});