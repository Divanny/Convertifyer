<template>
  <div class="mx-auto flex justify-center	content-center max-w-2xl h-full flex-wrap">
    <div class="text-center h-fit">
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        HTML to PDF
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-300">
        Save web pages for offline viewing with <strong>Convertifyer</strong>, the best way to PDFify any web page
      </p>
      <div class="mt-10 sm:px-0 sm:mx-0 md:px-10 md:mx-10 lg:px-8 lg:mx-10">
        <file-pond v-bind:files="file" ref="filePond" credits="false" accepted-file-types="text/html" labelIdle='Drag & Drop your HTML file or <span class="filepond--label-action"> Browse </span>'/>
        <button @click="convert()" :disabled="disabledButton" :class="{ 'opacity-25 cursor-not-allowed': disabledButton }" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Convert</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { usePush } from 'notivue';

export default {
  setup() {
    const push = usePush();
    return { push };
  },
  data: function() {
    return {
      file: [],
      disabledButton: false,
      config: {
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_RAPID_API_KEY
        }
      }
    };
  },
  methods: {
    convert() {
      if (!this.$refs.filePond.getFile()) {
        this.push.warning('Please specify the HTML file');
        return;
      }

      const notification = this.push.promise("We're converting your HTML...")
      this.disabledButton = true;

      const vueInstance = this;      
      const reader = new FileReader();
      
      reader.onload = async function() {
        let base64String = reader.result.split(',')[1];

        try {
          const response = await api.post('https://cloudlayer-io.p.rapidapi.com/v1/html/pdf', {html: base64String}, {
            ...vueInstance.config,
            responseType: 'blob',
          });
          notification.resolve('HTML converted successfully');
          this.disabledButton = false;

          const blob = new Blob([response.data], {type: 'application/pdf'});
          const link = document.createElement('a');
          link.download = vueInstance.$refs.filePond.getFile().file.name + '.pdf';
          link.href = URL.createObjectURL(blob);
          link.click();
          vueInstance.$refs.filePond.removeFile();
        }
        catch (ex) {
          notification.reject('There was an error converting the HTML. Please try again.')
          this.disabledButton = false;
        }
      };

      reader.readAsDataURL(this.$refs.filePond.getFile().file);
    },
  },
};
</script>