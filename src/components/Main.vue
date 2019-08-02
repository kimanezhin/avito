<template>
  <div class = "inner-table">
    <div class="empty-screen" v-if="isEmpty">К сожалению, здесь пока пусто:(</div>
    <transition-group v-else class="table" name="cards">
      <Ad
        class="card"
        v-for="item in itemList"
        :key="item.id"
        :itemid="parseInt(item.id)"
        :title="item.title"
        :price="item.price+''"
        :sellerid="parseInt(item.relationships.seller)"
        :pictures="item.pictures"
        @sellerFound="addSeller"
      />
    </transition-group>
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
          let _ids = localStorage.getItem("favourites") || "";
          let ids = _ids.split(" ");

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
      if (this.currentCategory !== "favourites") return;
      this.onFilterChanged("favourites");
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
  },
  computed: {
    isEmpty() {
      this.$emit("listSizeChanged", this.itemList.length);
      return !this.itemList.length;
    }
  }
};
</script>
<style scoped>
.table {
  display: flex;
  flex-direction: row;
  overflow: none;
  flex-wrap: wrap;
  justify-content: center;
}

.cards-enter,
.cards-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.cards-leave-active {
  position: absolute;
}

.card {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.empty-screen {
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  line-height: 10;
}

.inner-table{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
</style>
