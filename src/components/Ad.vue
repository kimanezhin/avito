<template>
  <div>
    <div class="shop-card" @mouseover="changeOpacity(0.5)" @mouseleave="changeOpacity(0)">
      <img
        v-if="!isFavourite"
        title="Добавить в избранное"
        :name="itemid"
        @click="addToFavourites"
        class="favourite"
        src="../assets/star_77949.svg"
      />
      <img
        v-else
        title="Удалить из избранного"
        :name="itemid"
        @click="removeFromFavourites"
        class="favourite"
        src="../assets/cross.svg"
      />
      <div class="container">
        <img class="ad-photo" :src="pictures[0]" />
        <div class="counter">{{pictures.length}}</div>
      </div>

      <div class="title">{{title}}</div>
      <div class="price">{{price ? priceMaker(price): "Не указано"}}</div>
      <div class="seller">
        <div class="seller-name">{{sellerName}}</div>

        <div class="rate seller-name">
          {{sellerRate}}
          <img src="../assets/star_77949.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  props: {
    itemid: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: "Не указано"
    },
    sellerid: {
      type: Number,
      default: 0
    },
    pictures: {
      type: Array
    }
  },
  mounted() {
    Axios.get(this.$sellers + "/" + this.sellerid).then(response => {
      this.sellerName = response.data.data.name;
      this.sellerRate = response.data.data.rating;
      this.$emit("sellerFound", {
        id: this.sellerid,
        name: this.sellerName,
        rate: this.sellerRate
      });
    });
    let favs = localStorage.getItem("favourites") || "";
    this.isFavourite = favs.split(" ").includes(this.itemid + "");
  },
  methods: {
    /**
     * Event handler. Changes opacity op a star/cross on a card.
     * @param {Double} op Opacity
     */
    changeOpacity(op) {
      document.getElementsByName(this.itemid)[0].style.opacity = op;
    },

    /**
     * Function that adds current card to the favourites
     */
    addToFavourites() {
      this.isFavourite = true;
      let cur = localStorage.getItem("favourites") || "";
      cur += this.itemid + " ";
      localStorage.setItem("favourites", cur);
    },

    /**
     * Removes current card from favourites
     * @emits favouritesChanged
     */
    removeFromFavourites() {
      this.isFavourite = false;
      let cur = localStorage.getItem("favourites") || "";
      cur = cur
        .split(" ")
        .filter(x => parseInt(x) !== this.itemid)
        .join(" ");
      localStorage.setItem("favourites", cur);
      this.$eventHub.$emit("favouritesChanged");
    },

    /**
     * Makes string with price
     * @param {String | Int} price Price
     * @returns {String} String with price
     */
    priceMaker(price) {
      if (!Number.isInteger(parseInt(price))) return "Не указано";
      price = price
        .split("")
        .reverse()
        .map((V, I) => {
          if (I % 3 == 0) V = V + " ";
          return V;
        })
        .reverse()
        .join("");
      return price + " " + "\u20BD";
    }
  },
  data() {
    return {
      sellerName: "",
      sellerRate: 0,
      isFavourite: false
    };
  }
};
</script>

<style scoped>
.shop-card {
  position: relative;
  max-width: 350px;
  background: #f5f5f5;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 5px;
  margin: 50px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.shop-card:hover {
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.35);
  transition: all 0.3s ease;
}

.favourite {
  position: absolute;
  top: 5%;
  left: 5%;
  height: 30px;
  z-index: 3;
  opacity: 0;
}

.favourite:hover {
  opacity: 1 !important;
  cursor: pointer;
}

.big-title {
  display: flex;
  align-items: center;
}
.ad-photo {
  height: 65%;
  width: 100%;
  max-height: 250px;
  object-fit: cover;
}
.title {
  padding: 10px;
  color: #0091d9;
}
.title:hover {
  color: red;
  cursor: pointer;
}

.title,
.price {
  font-weight: 600;
  font-size: 20px;
}
.price {
  padding-left: 10px;
}

.seller-name {
  padding: 10px;
  font-size: 18px;
  color: #999;
}
.rate {
  display: flex;
}

.rate > img {
  height: 18px;
  margin-left: 3px;
}

.seller {
  display: flex;
}

.counter {
  position: absolute;
  bottom: 5%;
  right: 5%;
  background: rgba(0, 0, 0, 0.377);
  height: 25px;
  width: 25px;
  text-align: center;
  line-height: 1.5;
  border-radius: 50px;
  color: white;
}
.container {
  position: relative;
}
</style>
