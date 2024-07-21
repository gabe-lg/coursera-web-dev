(() => {
  "use strict";

  angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);


  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ss) {
    const left = this;
    left.list = ss.toBuyList;
    left.itemBought = index => ss.itemBought(index);
  }


  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ss) {
    const right = this;
    right.list = ss.alreadyBoughtList;
  }


  function ShoppingListCheckOffService() {
    this.Item = function (name, quantity) {
      this.name = name;
      this.quantity = quantity;
    }

    this.toBuyList = [
      new this.Item("cookies", 10),
      new this.Item("cups", 5),
      new this.Item("books", 7),
      new this.Item("phones", 2),
      new this.Item("spoons", 6),
    ];
    this.alreadyBoughtList = [];

    this.itemBought = index => {
      this.alreadyBoughtList.push(this.toBuyList.splice(index, 1)[0]);
    }
  }
})();