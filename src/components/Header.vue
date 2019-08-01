<template>
  <header>
    <img src="../assets/avito.svg" title="Avito" class="logo" />
    <div class="header_links">
      <a class="header_link" href="#">Недвижимость</a>
      <a class="header_link" href="#">Фотоаппараты</a>
      <a class="header_link" href="#">Автомобили</a>
      <a class="header_link" href="#">Услуги</a>
      <a class="header_link" href="#">Избранное</a>
    </div>
  </header>
</template>

<script>
export default {};
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
}

.header_links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  margin-left: 5%;
}

.header_link {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 600;
  outline: none;
  text-decoration: none;
  padding: 10px;
  font-size:22px;
  color: black;
}

.header_link:hover{
    color: red;
}
</style>
