<template>
    <div class="retouch-image-container">
        <img src="@/assets/logo.png" alt="원본 이미지" class="retouch-image">
    </div>
</template>

<style scoped>
.retouch-image-container {
    text-align: center;
    /* 가운데 정렬을 위한 스타일 */
    max-width: 500px;
    /* 최대 너비 설정 (원하는 크기로 조절) */
    margin: 0 auto;
    /* 수평 가운데 정렬을 위한 스타일 */
    margin-top: 50px;
    border: 2px solid #000000;
    /* 테두리 설정: 두께 2px */


}

.retouch-image {
    width: 280px;
    height: 280px;
    object-fit: cover;
    /* 이미지를 비율 유지하면서 지정한 크기로 자르기 */
}</style>