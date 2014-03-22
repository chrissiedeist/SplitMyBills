window.SplitMyBills.Views.UserShow = Backbone.CompositeView.extend({

  template: JST["users/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addBill);
    this.listenTo(this.collection, "remove", this.removeBill);
    
    this.collection.each(this.addBill.bind(this));
    this.addNewBillView();
  },
  events: {
          
    "click button.add-bill": "toggleBillForm",
    "click button.cancel-bill": "toggleBillForm" 

  },


  addNewBillView: function(){
    var newBillView = new SplitMyBills.Views.BillNew( { model: this.model } );
    this.addSubview(".new", newBillView);
    newBillView.render();
                 
  },

  addBill: function(bill){
    var billShowView = new SplitMyBills.Views.BillShow({ model: bill });            
    this.addSubview(".bills", billShowView);
    billShowView.render();
  },

  removeBill: function(bill){

    var billShowView = _(this.subviews()[".bills"]).find(function(subview){
      return subview.model == bill
    });
    this.removeSubview('.bills', billShowView);
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);

    this.renderSubviews();
    return this;
  },

  toggleBillForm: function(event){
    event.preventDefault();

    $(".add-bill").toggleClass("hidden");
  },

})

