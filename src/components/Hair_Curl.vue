<template>
  <div>
    <div v-if="showSlider">
      <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">앞머리</button>
      <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">옆머리</button>
      <button @click="setSliderDefaultValue(50)" style="border: 2px solid #000000;">뒷머리</button>
    </div>
    <div v-if="showSlider">
      <v-slider v-model="sliderValue" :min="0" :max="100" step="1" thumb-label></v-slider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSlider: false,
      sliderValue: 50,
      sliderValues: {},
    };
  },
  mounted() {

    this.showSlider = this.$route.path === '/curl';


    this.$router.beforeEach((to, from, next) => {
      if (to.path === '/curl') {
        this.showSlider = true;
        this.setSliderDefaultValue(50);
        this.showSlider = false;
      }
      next();
    });
  },
  methods: {
    setSliderDefaultValue(value) {

      this.sliderValue = value;
    },
  },
};
</script>
