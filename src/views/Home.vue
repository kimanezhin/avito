<template>
  <div>
    <Header />
    <div id="main">
      <Main @listSizeChanged="onListSizeChanged" />
      <FilterMenu class="filterMenu" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Main from "../components/Main";
import Axios from "axios";
import FilterMenu from "../components/FilterMenu";
export default {
  components: {
    Header,
    Main,
    FilterMenu
  },
  data() {
    return {
      rightMenu: ""
    };
  },
  methods: {
    /**
     * Event handler. Shows and hides filter menu depends on a list length
     * @param {Int} size current list size
     */
    onListSizeChanged(size) {
      if (!this.rightMenu) return;
      if (!size) this.rightMenu.style.display = "none";
      else this.rightMenu.style.display = "initial";
    }
  },
  mounted() {
    this.rightMenu = document.getElementsByClassName("filterMenu")[0];
  }
};
</script>
<style scoped>
#main {
  display: flex;
}

@media screen and (max-width: 830px) {
  #main {
    flex-direction: column-reverse;
  }
}
</style>
