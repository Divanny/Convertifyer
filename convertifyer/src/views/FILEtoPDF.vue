<template>
  <div class="mx-auto flex justify-center	content-center max-w-2xl h-full flex-wrap">
    <div class="text-center h-fit">
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        File to PDF
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-300">
        Convert your files into portable documents with <strong>Convertifyer</strong>, the easy and secure way to convert images, powerpoint, excel and word to PDF
      </p>
      <div class="mt-10 sm:px-0 sm:mx-0 md:px-10 md:mx-10 lg:px-8 lg:mx-10">
        <file-pond v-bind:files="file" dropOnPage="true" dropOnElement="false" ref="filePond" credits="false" fileValidateTypeLabelExpectedTypes="Expects images, excel, powerpoint or word"
         accepted-file-types="image/*, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" labelIdle='Drag & Drop your file or <span class="filepond--label-action"> Browse </span>'/>
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
          'Content-Type': 'multipart/form-data',
          'X-RapidAPI-Key': process.env.VUE_APP_RAPID_API_KEY
        }
      }
    };
  },
  methods: {
    async convert() {
      if (!this.$refs.filePond.getFile()) {
        this.push.warning('Please specify the file');
        return;
      }

      var file = this.$refs.filePond.getFile().file;

      const notification = this.push.promise("We're converting your file...")
      this.disabledButton = true;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await api.post('https://pdf4me.p.rapidapi.com/RapidApi/ConvertToPdf', formData, this.config);
        notification.resolve('File converted successfully');
        this.disabledButton = false;

        const file = response.data.file;
        const linkSource = `data:application/pdf;base64,${file}`;
        const downloadLink = document.createElement("a");
        const fileName = response.data.fileName;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        this.$refs.filePond.removeFile();
      }
      catch (ex) {
        notification.reject('There was an error converting the file. Please try again.')
        this.disabledButton = false;
      }
    },
  },
};
</script>