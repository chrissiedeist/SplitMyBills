window.SplitMyBills = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    SplitMyBills.users = new SplitMyBills.Collections.Users();
    SplitMyBills.bills = new SplitMyBills.Collections.Bills();


    new SplitMyBills.Routers.AppRouter({
      $rootEl: $('#content'),
      users: SplitMyBills.users,
      bills: SplitMyBills.bills

    })
    Backbone.history.start();
  }
};


Backbone.CompositeView = Backbone.View.extend({

  addSubview: function(selector, subview){
    var selectorSubviews = this.subviews()[selector] || (this.subviews()[selector] = []);
    selectorSubviews.push(subview);
    
    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  remove: function(){
    // this.model.trigger('destroy');
    // this.model.unbind();
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function(selectorSubviews, selector) {
      _(selectorSubviews).each(function(subview){
        subview.remove();
      });
    });
  },

  removeSubview: function(selector, subview) {
    var selectorSubviews = this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();


  },

  renderSubviews: function(){
    var view = this; 

    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function(subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function(){
    if (!this._subviews) {
      this._subviews = {};
    }
    return this._subviews;
  }

})

$(document).ready(function(){
  SplitMyBills.initialize();
});
