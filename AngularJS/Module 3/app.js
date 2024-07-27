(() => {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItemsDirective)
    .constant(
      "ApiBasePath",
      "https://coursera-jhu-default-rtdb.firebaseio.com"
    );

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(ms) {
    const nc = this;
    nc.found = [];
    nc.searched = false;
    nc.searchTerm = "";
    nc.searchButton = searchTerm => {
      ms.getMatchedMenuItems(searchTerm).then(result => {
        if (searchTerm.length && result.length) nc.found = result;
        else nc.found = [];
        nc.searched = true;
      });
    };
    nc.remove = index => nc.found.splice(index, 1);
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    this.getMatchedMenuItems = searchTerm => {
      return $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      }).then(result => {
        let foundItems = [];
        for (let prop in result.data) {
          foundItems.push(
            result.data[prop].menu_items.filter(item =>
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
        return foundItems.flat();
      });
    };
  }

  FoundItemsDirective.$inject = [];
  function FoundItemsDirective() {
    return {
      templateUrl: "item.html",
      scope: { items: "<", onRemove: "&", searched: "<" },
      // bindToController: true,
      // link: MyLinkFunction,
      // transclude: true,
    };
  }
})();
