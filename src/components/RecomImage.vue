<template>
    <div class="recom-image-container">
      <div class="image-with-text">
        <img src="@/assets/person1.jpeg" alt="원본 이미지" class="recom-image1">
        <p class="image-text">헤어추천1</p>
      </div>
      <div class="image-with-text">
        <img src="@/assets/logo.png" alt="원본 이미지" class="recom-image2">
        <p class="image-text">헤어추천2</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .recom-image-container {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
    margin-top: 50px;

  }
  
  .image-with-text {
    margin-bottom: 20px; 
  }
  
  .recom-image1,
  .recom-image2 {
    width: 240px;
    height: 240px;
    object-fit: cover;
  }
  
  .image-text {
    text-align: center;
    font-weight: bold;
    margin-top: 10px; 
  }
  </style>
  