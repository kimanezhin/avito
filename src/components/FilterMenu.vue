<template>
  <div id="right-panel">
    <hr style="margin-bottom: 30px;" />
    <div class="sort-buttons" style="margin-bottom: 20px;">
      Сортировать:
      <div
        class="sort-button"
        :class="{chosenType:sortType === 'id'}"
        @click="changeSortType('id')"
      >по популярности</div>
      <div
        class="sort-button"
        :class="{chosenType:sortType === 'price'}"
        @click="changeSortType('price')"
      >по цене</div>
    </div>

    <div class="price-filter">Цена, &#8381;</div>
    <div class="price-enter">
      <input id="fromInput" v-model="from" type="number" placeholder="Цена от" />
      <input id="toInput" v-model="to" type="number" placeholder="до, руб." />
    </div>
    <div @click="resetFilters" class="reset-filters">сбросить фильтры</div>
    <button @click="setRange" class="btn-filter">
      <span>Показать</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortType: '',
      from: "",
      to: ""
    };
  },
  methods: {
    changeSortType(type) {
      this.sortType = type;
      this.$eventHub.$emit("filterChanged", type);
    },
    setRange() {
      if (this.from && this.to
         && parseInt(this.from) <= parseInt(this.to) 
         && parseInt(this.from) >= 0 && parseInt(this.to) > 0) {
        this.$eventHub.$emit("filterChanged", "range", this.from, this.to);
        document.getElementById("fromInput").style.border = "1px solid black";
        document.getElementById("toInput").style.border = "1px solid black";
      } else if (!this.from && this.to) {
        document.getElementById("fromInput").style.border = "1px solid red";
        document.getElementById("toInput").style.border = "1px solid black";
      } else if (!this.to && this.from) {
        document.getElementById("toInput").style.border = "1px solid red";
        document.getElementById("fromInput").style.border = "1px solid black";
      } else {
        document.getElementById("fromInput").style.border = "1px solid red";
        document.getElementById("toInput").style.border = "1px solid red";
      }
    },
    resetFilters() {
      this.from = this.to = "";
      this.$eventHub.$emit("resetFilter");
      this.sortType = '';
    }
  }
};
</script>


<style>
.sort-buttons {
  display: flex;
}

.reset-filters {
  cursor: pointer;
  float: right;
  margin-bottom: 5px;
}
.reset-filters:hover {
  text-decoration: underline;
}
.sort-button {
  margin-left: 5%;
  cursor: pointer;
}
.sort-button:not(.chosenType):hover {
  color: red;
}
.sort-buttons {
  font-size: 18px;
}
.chosenType {
  color: #3333cc;
}
body {
  margin: 0;
}

#right-panel {
  height: 500px;
  width: 400px;
  padding: 50px;
}
.price-enter {
  display: flex;
  margin-bottom: 20px;
}

.price-filter {
  font-weight: 600;
  margin-bottom: 10px;
}
.price-enter > input {
  width: 90%;
  height: 30px;
  font-size: 15px;
}

.price-enter > input::placeholder {
  padding: 5px;
}

.btn-filter {
  width: 100%;
  height: 30px;

  background-color: #0af;
  cursor: pointer;
  border-color: transparent;
}
.btn-filter > span {
  font-size: 20px;
  color: white;
}

.btn-filter:hover {
  background: #009cf0;
  border-color: transparent;
}
</style>
