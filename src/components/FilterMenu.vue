<template>
  <div id="right-panel">
    <hr style="margin-bottom: 30px;" />
    <div class="sort-buttons" style="margin-bottom: 20px;">
      Сортировать:
      <div
        class="sort-button"
        :class="{chosenType:isSortedByPopularity}"
        @click="changeSortType('id')"
      >по популярности</div>
      <div
        class="sort-button"
        :class="{chosenType:!isSortedByPopularity}"
        @click="changeSortType('price')"
      >по цене</div>
    </div>

    <div class="price-filter">Цена, &#8381;</div>
    <div class="price-enter">
      <input type="text" placeholder="Цена от" />
      <input type="text" placeholder="до, руб." />
    </div>
    <div @click="resetFilters" class="reset-filters">сбросить фильтры</div>
    <button class="btn-filter">
      <span>Показать</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSortedByPopularity: true
    };
  },
  methods: {
    changeSortType(type) {
      this.isSortedByPopularity = type === "id" ? true : false;
      this.$eventHub.$emit("filterChanged", type);
    },
    resetFilters(){
        // this.changeSortType('id');
        this.$eventHub.$emit('resetFilter')
        this.isSortedByPopularity = true;
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
