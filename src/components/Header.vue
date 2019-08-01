<template>
  <header>
    <img  @click="refresh" src="../assets/avito.svg" title="Avito" class="logo" />
    <div class="header_links">
      <div class="header_link" :class="{chosenLink:currentFilter === 'immovable'}" @click="changeFilter('immovable')">Недвижимость</div>
      <div class="header_link" :class="{chosenLink:currentFilter === 'cameras'}" @click="changeFilter('cameras')">Фотоаппараты</div>
      <div class="header_link" :class="{chosenLink:currentFilter === 'auto'}" @click="changeFilter('auto')">Автомобили</div>
      <div class="header_link" :class="{chosenLink:currentFilter === 'laptops'}" @click="changeFilter('laptops')">Ноутбуки</div>
      <div class="header_link" :class="{chosenLink:currentFilter === 'favourites'}" @click="changeFilter('favourites')">Избранное</div>
    </div>
  </header>
</template>

<script>
export default {
    data() {
        return {
            currentFilter:''
        }
    },
    mounted() {
        this.$eventHub.$on('resetFilter',this.resetFilter)
    },
    beforeDestroy() {
        this.$eventHub.$off('resetFilter', this.resetFilter)
    },
  methods: {
    changeFilter(type) { 
      this.currentFilter = type;
      this.$eventHub.$emit("filterChanged", type);
    },
    resetFilter(){
        this.currentFilter = "";
    },
    refresh(){
        if(window.location.href === this.$homepage)
            window.location.reload();
        window.location.href = this.$homepage;
    }
  }
};
</script>

<style scoped>
header {
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo {
  height: 70px;
  margin-left: 20px;
  cursor: pointer;
}

.header_links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  margin-left: 5%;
}

.header_link {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 600;
  outline: none;
  text-decoration: none;
  padding: 10px;
  font-size: 22px;
  color: black;
  cursor:pointer;
}

.header_link:hover, .chosenLink {
  color: red;
}
</style>
