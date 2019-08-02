<template>
  <div>
    <Header />
    <div id="main">
      <Main @listSizeChanged="onListSizeChanged"/>
      <FilterMenu v-if="isNotEmpty"/>
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
  data() {
    return {
      isNotEmpty:false
    }
  },
  methods: {
    onListSizeChanged(size){
      this.isNotEmpty = !!size;
    }
  },
};
</script>
<style scoped>
#main{
  display: flex;
}

@media screen and (max-width: 830px) {
 #main{
   flex-direction: column-reverse;
 }   
}
</style>
