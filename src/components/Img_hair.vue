<template>
    <div class="original-image-container">
        <img src="@/assets/펌머리.png" alt="원본 이미지" class="original-image">
    </div>
</template>

<style scoped>
.original-image-container {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  border: 2px solid #000000;
}

.original-image {
  width: 200px;
  height: 280px;
  object-fit: cover; /* 이미지를 비율 유지하면서 지정한 크기로 자르기 */
}
</style>