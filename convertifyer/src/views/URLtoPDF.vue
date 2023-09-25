<template>
  <div class="mx-auto flex justify-center	content-center max-w-2xl h-full flex-wrap">
    <div class="text-center h-fit">
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        URL to PDF
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-300">
        Turn your favorite websites into PDFs with <b>Convertifyer</b>, <br/> the free and easy-to-use URL to PDF converter
      </p>
      <div class="flex w-100 mt-10 sm:mx-0 md:mx-10 lg:mx-12 justify-between">
        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-full focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">https://</span>
          <input type="text" v-model="url" @change="deleteHTTPS()" @keyup.enter="convert()" name="url" id="url" autocomplete="url" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-100 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6" placeholder="www.google.com">
        </div>
        <button @click="convert()" :disabled="disabledButton" :class="{ 'opacity-25 cursor-not-allowed': disabledButton }" class="rounded-md bg-indigo-600 ml-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Convert</button>
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
  watch: {
    url: {
      handler(val) {
        this.deleteHTTPS();
      },
      deep: true,
    },
  },
  data: function() {
    return {
      url: "",
      disabledButton: false,
      config: {
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_RAPID_API_KEY
        }
      }
    };
  },
  methods: {
    deleteHTTPS() {
      this.url = this.url.replace('https://', '');
    },
    async convert() {
      if (this.url == "") {
        this.push.warning('Please specify the URL');
        return;
      }
      
      const notification = this.push.promise("We're converting your URL...")
      this.disabledButton = true;

      try {
        const response = await api.post('https://cloudlayer-io.p.rapidapi.com/v1/url/pdf', {url: "https://" + this.url}, {
          ...this.config,
          responseType: 'blob',
        });
        notification.resolve('URL converted successfully');
        this.disabledButton = false;

        const blob = new Blob([response.data], {type: 'application/pdf'});
        const link = document.createElement('a');
        link.download = this.url + '.pdf';
        link.href = URL.createObjectURL(blob);
        link.click();
        this.url = "";
      }
      catch (ex) {
        notification.reject('There was an error converting the URL. Please try again.')
        this.disabledButton = false;
      }
    },
  },
};
</script>