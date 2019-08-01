<template>
  <div>
    <div class="shop-card" @mouseover="showIcon">
        <img  class="favourite" src="../assets/star_77949.svg" />
      <div class="container">
          <img class="ad-photo" src="../assets/839507322.jpg" />
          <div class="counter">6</div>
      </div>

      <div class="title">Платье</div>
      <div class="price">1000 &#8381;</div>
      <div class="seller">
        <div class="seller-name">Иван Пупкин</div>

        <div class="rate">
          <img src="../assets/star_77949.svg" />
          <img src="../assets/star_77949.svg" />
          <img src="../assets/star_77949.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        showIcon(){
            document.getElementsByClassName('favourite')[0].style.opacity="0.5";
        }
    },
};
</script>

<style scoped>
.shop-card {
    position: relative;
  width: 350px;
  /* height: 350px; */
  background: #f5f5f5;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 5px;
  margin: 50px;
  display: flex;
  flex-direction: column;
}

.favourite{
    position: absolute;
    top:5%;
    left: 5%;
    height: 30px;
    z-index: 3;
    opacity: 0;
}

.favourite:hover{
    opacity: 1;
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
.title:hover{
    color: red;
    cursor: pointer;
}

.title,
.price{
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
.rate{
    display: flex;
    align-items: center;
}

.rate > img{
    height: 20px;
}

.seller{
    display: flex;
}

.counter{
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
.container{
    position: relative;
}
</style>
