window.SplitMyBills.Views.FriendShow = Backbone.CompositeView.extend({

  template: JST["users/friend_show"],

  initialize: function(){

    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.model.debtorsBills(), "add", this.render);
    this.listenTo(this.model.debtorsBills(), "change", this.render);
    this.listenTo(this.model.debtorsBills(), "remove", this.render);

    this.addDebtorsBillsIndexView();
  },

  addDebtorsBillsIndexView: function() {
    var indexView = new SplitMyBills.Views.DebtorsBillsIndex( { 
      collection: this.model.debtorsBills(),
      user: this.model
    });
    this.addSubview(".debtors-bills-index", indexView);
    indexView.render();
  },

  render: function(){
    var content = this.template({ user: this.model });
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },
})




