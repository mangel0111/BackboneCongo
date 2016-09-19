Congo.View = Backbone.View.extend({
    render: function () {
        var source = $(this.template).html();
        var modelView = {};
        if (this.model)
            model = this.model.toJSON();
        var compiled = _.template(source, modelView);
        $(this.el).html(compiled);
        return this;
    }
});

Congo.ListView = Backbone.View.extend({
    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.render, this);
        this.collection.bind("remove", this.render, this);
        this.renderOptionView();
    },
    renderOptionView: function () {
        var optionView = new Congo.DatabaseOptionView({ el: "#db-options" });
    },
    render: function () {
        var dbList = [];
        var self = this;
        this.collection.each(function (item) {
            var itemView = new self.ItemView({ model: item });
            dbList.push(itemView.render().el);
        });
        $(this.el).html(dbList);
        return this;
        // $('#database-list').append(this.el);
    }
});

Congo.Layout = Backbone.View.extend({
    render: function () {
        //Render template
        var templateSource = $('#db-details-template').html();
        this.$el.append(_.template(templateSource));

        var self = this;

        //Loop the regions 
        _.each(self.regions, function (selector, name) {
            self[name] = self.$(selector);
        });

        //now emit and event that says the DOM template is loaded
        //and that we have explicit jquery objects set for the regions
        if (self.layoutReady) self.layoutReady();

        return self;
    }
});