Congo.BreadcrumbView = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  render: function () {
    $(this.el).append("<li><h3><a href='#'>Databases</a></h3></li>");
    return this;
  },
  events: {
    "click a": "sayHello"
  },
  sayHello: function () {
    alert("This is just a test!");
  }
});