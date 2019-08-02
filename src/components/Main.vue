<template>
  <div style="width: 80%;">
    <div class="table">
      <Ad
        v-for="item in itemList"
        :key="item.id"
        :itemid="parseInt(item.id)"
        :title="item.title"
        :price="item.price+''"
        :sellerid="parseInt(item.relationships.seller)"
        :pictures="item.pictures"
        @sellerFound="addSeller"
      />
    </div>
  </div>
</template>

<script>
import Ad from "./Ad";
import Axios from "axios";
export default {
  components: {
    Ad
  },
  data() {
    return {
      itemList: [],
      constantList: [],
      sellers: new Map(),
      filter: a => a,
      currentCategory: "",
      sorter: (a, b) => a.id - b.id,
      rangeFilter: a => a
    };
  },
  methods: {
    onFilterChanged(type, from, to) {
      switch (type) {
        case "id":
          this.sorter = (a, b) => {
            return (
              this.sellers.get(parseInt(a.relationships.seller)).rate -
              this.sellers.get(parseInt(b.relationships.seller)).rate
            );
          };
          this.itemList = this.itemList.sort(this.sorter);
          return;
        case "price":
          this.sorter = (a, b) => a.price - b.price;
          break;
        case "range":
          this.rangeFilter = a => a.price >= from && a.price <= to;
          this.itemList = this.constantList.filter(this.rangeFilter);
          break;
        case "favourites":
          let ids = localStorage.getItem("favourites").split("");

          this.filter = a => ids.includes(a.id);
          this.currentCategory = "favourites";
          this.itemList = this.constantList.filter(this.filter);
          break;
        default:
          this.currentCategory = type;
          this.filter = a => a.category === type;
          this.itemList = this.constantList
            .filter(this.filter)
            .filter(this.rangeFilter);
          break;
      }
      this.itemList = this.itemList
        .filter(a => Number.isInteger(a.price))
        .sort(this.sorter)
        .concat(
          this.constantList.filter(a => {
            if (this.currentCategory)
              return (
                !Number.isInteger(a.price) &&
                a.category === this.currentCategory
              );
            return !Number.isInteger(a.price);
          })
        );
    },
    resetFilter() {
      this.sorter = (a, b) => a.id - b.id;
      this.filter = a => a;
      this.currentCategory = "";
      this.itemList = this.constantList.sort((a, b) => a.id - b.id);
    },
    addSeller(seller) {
      this.sellers.set(seller.id, seller);
    },
    favouriteChecker() {
        if(this.currentCategory !== "favourites")
            return;
        this.onFilterChanged('favourites')
    }
  },
  mounted() {
    Axios.get(this.$products).then(response => {
      this.itemList = response.data.data;
      this.constantList = this.itemList;
    });

    this.$eventHub.$on("filterChanged", this.onFilterChanged);
    this.$eventHub.$on("resetFilter", this.resetFilter);
    this.$eventHub.$on("favouritesChanged", this.favouriteChecker);
  },
  beforeDestroy() {
    this.$eventHub.$on("favouritesChanged", this.favouriteChecker);
    this.$eventHub.$off("resetFilter", this.resetFilter);
    this.$eventHub.$off("filterChanged", this.onFilterChanged);
  }
};
</script>
<style scoped>
.table {
  display: flex;
  flex-direction: row;
  overflow: none;
  flex-wrap: wrap;
}
</style>
