<template>
  <div class="uk-container-expand">
    <div class="uk-grid">
      <div class="uk-text-center uk-width-1-1 uk-padding-small">
        <a class="uk-button uk-button-primary" :href="resumePDF" download="jssresume.pdf">Download</a>
        <button class="uk-button uk-button-primary" v-on:click="printResume">Print</button>
      </div>
      <div class="uk-text-center uk-width-1-1">
        <canvas id="resumeCanvas" class="uk-card uk-card-default"></canvas>
      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
  import pdfjsLib from 'pdfjs-dist';
  import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
  import resumePDF from 'file-loader!resources/Resume.pdf';
  export default {
    name: 'Resume',
    data: function() {
      return {
        resumePDF
      };
    },
    methods: {
      printResume() {
        printJS(resumePDF, 'pdf');
      }
    },
    created: function() {
      this.$store.commit('changeTransparentBGNavbar', false);

      const loadingTask = pdfjsLib.getDocument(resumePDF);
      loadingTask.promise.then(function (pdfDocument) {
        // Request a first page
        return pdfDocument.getPage(1).then(function (pdfPage) {
          // Display page on the existing canvas with 100% scale.
          const viewport = pdfPage.getViewport(1.0);
          const canvas = document.getElementById('resumeCanvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          const renderTask = pdfPage.render({
            canvasContext: ctx,
            viewport: viewport
          });
          return renderTask.promise;
        });
      }).catch(function (reason) {
        console.error('Error: ' + reason);
      });
    }
  };
</script>
