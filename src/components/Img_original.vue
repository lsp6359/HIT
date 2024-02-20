<template>
  <!-- <div id="contents"> -->
  <div class="original-image-container">
    <div class="camera">
      <video id="video" ref="video" @canplay="playVideo"></video>
      <button @click="takePhoto">take Photo</button>
    </div>

    <div class="original-image">
      <button @click="executeOSCommand">execute OS command</button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios';
export default {
  name: "start-video-practice",
  data() {
    return {
      video: null,
      streaming: false,
      height: 280,
      width: 280
    }
  },
  mounted() {
    this.video = this.$refs.video;

    this.getMediaStream();

  },
  methods: {
    getMediaStream() {
      navigator.mediaDevices.getUserMedia(
        { video: true, audio: false } // 비디오, 오디오 사용??
      ).then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      }).catch((err) => {
        console.error(`error occurred : ${err}`);
      })
    },
    playVideo() {
      if (!this.streaming) {
        this.streaming = true;
        this.height = this.video.videoHeight / this.video.videoWidth * this.width;

        this.video.height = this.height;
        this.video.width = this.width;
      }
    },
    takePhoto() {
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      const context = canvas.getContext("2d");
      context.drawImage(this.video, 0, 0, this.width, this.height);

      // Get the data URL directly
      const dataURL = canvas.toDataURL("image/png");

      // Download the image
      this.downloadImage(dataURL, "captured_image.png");

      // Uncomment the following block if you want to upload to the server using axios
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'captured_image.png');
        axios.post('http://localhost:8000/build', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(`Error uploading image: ${error}`);
          });
      }, 'image/png');
    },

    downloadImage(dataURL, fileName) {
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    // takePhoto() {
    //   const canvas = document.createElement("canvas");
    //   canvas.width = this.width;
    //   canvas.height = this.height;
    //   const context = canvas.getContext("2d");
    //   context.drawImage(this.video, 0, 0, this.width, this.height);

    //   // Convert the canvas content to a Blob
    //   canvas.toBlob((blob) => {
    //     // Create a FormData object
    //     const formData = new FormData();
    //     formData.append('image', blob, 'captured_image.png');

    //     // Send the image to the server
    //     axios.post('http://localhost:3000/upload', formData)
    //       .then(response => {
    //         console.log(response.data);
    //       })
    //       .catch(error => {
    //         console.error(`Error uploading image: ${error}`);
    //       });
    //   }, 'image/png');
    // }

      makeImage() {
        //send image route, target route, source color to server
        axios.post('http://localhost:8000/upload', {
          image: this.image,
          target: this.target,
          source: this.source
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(`Error uploading image: ${error}`);
          });
      }
    
  }
}
</script>

<style scoped>
.original-image-container {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  border: 2px solid #000000;
}


#video {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width: 320px;
  height: 240px;
}

.camera {
  width: 340px;
  display: inline-block;
}
</style>