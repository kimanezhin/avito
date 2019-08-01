<template>
  <div>
    <Header />
    <div id="main">
      <Main />
      <FilterMenu/>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Main from "../components/Main";
import Axios from "axios";
import FilterMenu from '../components/FilterMenu'
export default {
  components: {
    Header,
    Main,
    FilterMenu
  },
};
</script>
<style scoped>
#main{
  display: flex;
}
</style>
