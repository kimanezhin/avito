<template>
<div style="width: 80%;">
    <div class="table">
        <Ad/>
        <Ad/>
        <Ad/>
        <Ad/>
        <Ad/>
        <Ad/>
    </div>
    </div>
</template>

<script>
import Ad from './Ad'
export default {
    components:{
        Ad
    },
}
</script>
<style scoped>
.table{
    display: flex;
    flex-direction: row;
    overflow: none;
    flex-wrap: wrap;
}
</style>
