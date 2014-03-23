window.SplitMyBills.Views.BillNew = Backbone.View.extend({

  template: JST["bills/form"],

  initialize: function(){
    this.listenTo(this.model.friends(), "add", this.render);
  },

  events: {
    "click button.create-bill": "createBill",
    "click a.add-debtor": "addDebtorSelect",
    "click .close": "removeDebtorSelect",
    "click button.add-bill": "showAddBillButton",
  },

  addDebtorSelect: function(event){
    event.preventDefault();

    var newSelect = JST["debtor_select"]( { friends: this.collection });
    $(".debtor-selects").append(newSelect);

    var numDebtors = $(".debtor-selects select").length;
    var defaultPct = (100 / (numDebtors + 1));

    $(".debtor-selects input").val(defaultPct);
  },

  createBill: function(event) {
    event.preventDefault();
    var that = this;

    $(".add-bill").toggleClass("hidden");
    var billData = $('form.add-bill').serializeJSON()['bill'];
    SplitMyBills.bills.create(billData);
    SplitMyBills.bills.fetch();
  },

  render: function(){

    var user = this.model;
    var friends = user.friends();
    var newBill = new SplitMyBills.Models.Bill();
    var content = this.template({ friends: friends, bill: newBill }); //current users friends

    this.$el.html(content);
    return this;
  },
  
  showAddBillButton: function(event){
    event.preventDefault();

    $(".add-bill").toggleClass("hidden");
  },


})


