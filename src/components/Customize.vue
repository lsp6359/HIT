<template>
    <v-row justify="center" style="min-height: 300px;">
        <v-col cols="4" class="shrink text-center">
            <v-btn class="ma-2" width="200px" :color="expand1 ? 'primary' : 'secondary'"
                @click="expand1 = !expand1; expand2 = false; expand3 = false" style="height: 50px;" color="#43FFC0">
                <img src="@/assets/hair_color.png" alt="원본 이미지" class="original-image" style="height:50px;">
            </v-btn>
        </v-col>

        <v-col cols="4" class="shrink text-center">
            <v-btn class="ma-2" width="200px" :color="expand2 ? 'primary' : 'secondary'"
                @click="expand2 = !expand2; expand1 = false; expand3 = false" style="height: 50px;" color="#43FFC0">
                <img src="@/assets/hair_cut.png" alt="원본 이미지" class="original-image" style="height:50px;">
            </v-btn>
        </v-col>

        <v-col cols="4">
            <!-- <router-link to="/curl" class="nav-link">컬</router-link> -->
            <v-btn class="ma-2" width="200px" :color="expand3 ? 'primary' : 'secondary'"
                @click="expand3 = !expand3; expand1 = false; expand2 = false" style="height: 50px;" color="#43FFC0">
                <img src="@/assets/hair_curl.png" alt="원본 이미지" class="original-image" style="height:50px;">
            </v-btn>
        </v-col>


        <v-row>
            <v-col cols="12">
                <v-expand-x-transition>
                    <div v-if="expand1" class="transition-container">
                        <!-- 첫 번째 버튼과 관련된 내용 -->
                        <div class="flex-container">
                            <v-card style="margin-right: 25px;">
                                <v-color-picker v-model="currentColor" dot-size="6" mode="hexa"
                                    canvas-height="100"></v-color-picker>
                            </v-card>

                            <!-- <v-color-picker dot-size="6" hide-inputs hide-sliders canvas-height="0" :swatches="swatches"
                                show-swatches @input="updateCurrentColor" width="500px"></v-color-picker> -->
                            <v-card style="padding: 50px">

                                <v-btn v-for="(colors, index1) in swatches" :key="'color1_' + index1" :color="colors[0]"
                                    @click="updateCurrentColor(colors[0])" class="mr-2">
                                </v-btn>
                                <br><br>
                                <v-btn v-for="(colors, index2) in swatches" :key="'color2_' + index2" :color="colors[1]"
                                    @click="updateCurrentColor(colors[1])" class="mr-2">
                                </v-btn>
                                <br><br>
                                <v-btn v-for="(colors, index3) in swatches" :key="'color3_' + index3" :color="colors[2]"
                                    @click="updateCurrentColor(colors[2])" class="mr-2">
                                </v-btn>
                            </v-card>
                        </div>
                    </div>

                    <div v-if="expand2" class="transition-container">
                        <!-- 두 번째 버튼과 관련된 내용 -->
                        <!-- 예: 두 번째 기장에 관련된 콘텐츠 -->
                        <div class="flex-container">
                            <div>

                                <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">앞머리</button>
                                <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">옆머리</button>
                                <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">뒷머리</button>

                                <v-slider v-model="sliderValue" :min="0" :max="100" step="1" thumb-label></v-slider>

                            </div>
                        </div>
                    </div>


                    <div v-if="expand3" class="transition-container">
                        <!-- 세 번째 버튼과 관련된 내용 -->
                        <div class="flex-container">
                            <div>

                                <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">앞머리</button>
                                <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">옆머리</button>
                                <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">뒷머리</button>

                                <v-slider v-model="sliderValue" :min="0" :max="100" step="1" thumb-label></v-slider>

                            </div>
                        </div>
                    </div>



                </v-expand-x-transition>

            </v-col>
        </v-row>
    </v-row>
</template>
  
<script>
export default {
    data: () => ({
        expand1: false,
        expand2: false,
        expand3: false,
        currentColor: '', // 첫 번째 컬러 피커의 현재 색상

        swatches: [
            ['#FF0000FF', '#AA0000FF', '#550000FF'],
            ['#FFFF00FF', '#AAAA00FF', '#555500FF'],
            ['#00FF00FF', '#00AA00FF', '#005500FF'],
            ['#00FFFFFF', '#00AAAAFF', '#005555FF'],
            ['#0000FFFF', '#0000AAFF', '#000055FF'],
        ],


        showSlider: false,
        sliderValue: 50,
        sliderValues: {},

    }),
    methods: {
        updateCurrentColor(selectedColor) {
            // 두 번째 컬러 피커에서 선택한 색상을 첫 번째 컬러 피커에 반영
            this.currentColor = selectedColor;
        },
        setSliderDefaultValue(value) {
            this.sliderValue = value;
        },
    },
};
</script>
  
<style scoped>
.transition-container {
    overflow: hidden;
    /* 트랜지션 중에도 높이 넘침 방지 */
    height: auto;
    /* 250px */
}

.flex-container {

    justify-content: center;
    /* 수평 가운데 정렬 */
    align-items: center;
    /* 수직 가운데 정렬 */
    display: flex;
}
</style>
  