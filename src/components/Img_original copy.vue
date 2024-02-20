
<script>
import axios from 'axios';
export default {
  name: "start-video-practice",
  data() {
    return {
      video: null,
      height: 280,
      width: 280
    }
  },
  mounted() {

  },
  methods: {
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
        axios.post('http://localhost:8000/upload', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(`Error uploading image: ${error}`);
          });
      }, 'image/png');
    },

    // downloadImage(dataURL, fileName) {
    //   const a = document.createElement("a");
    //   a.href = dataURL;
    //   a.download = fileName;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // },
  }
}
</script>