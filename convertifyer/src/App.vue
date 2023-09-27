<template>
  <Notivue v-slot="item">
    <NotivueSwipe :item="item">
      <Notifications :item="item" :theme="darkTheme" />
    </NotivueSwipe>
  </Notivue>
  <div class="bg-gray-900 h-full overflow-hidden">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only text-white">Convertifyer</span>
            <img class="h-8 w-auto" src="./assets/Convertifyer.png" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link v-for="item in navigation" :key="item.name" :to="item.href"
            class="text-sm font-semibold leading-6 text-gray-100">{{ item.name }}</router-link>
        </div>
        <!-- <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-100"
            >Log in <span aria-hidden="true">&rarr;</span></a
          >
        </div> -->
      </nav>
      <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Convertifyer</span>
              <img class="h-8 w-auto" src="./assets/Convertifyer.png" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-300" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <router-link v-for="item in navigation" @click.native="mobileMenuOpen = false" :key="item.name"
                  :to="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{
                    item.name }}</router-link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8 h-full">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
                clip-path: polygon(
                  74.1% 44.1%,
                  100% 61.6%,
                  97.5% 26.9%,
                  85.5% 0.1%,
                  80.7% 2%,
                  72.5% 32.5%,
                  60.2% 62.4%,
                  52.4% 68.1%,
                  47.5% 58.3%,
                  45.2% 34.5%,
                  27.5% 76.7%,
                  0.1% 64.9%,
                  17.9% 100%,
                  27.6% 76.8%,
                  76.1% 97.7%,
                  74.1% 44.1%
                );
              " />
      </div>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          " />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { Notivue, Notifications, NotivueSwipe, darkTheme } from 'notivue'

const navigation = [
  { name: "URL to PDF", href: "/URLtoPDF" },
  { name: "File to PDF", href: "/FiletoPDF" },
  { name: "HTML a PDF", href: "/HTMLtoPDF" },
  { name: "Make a PDF Searchable", href: "/MakePDFSearchable" },
];

const mobileMenuOpen = ref(false);
</script>

<style scoped></style>
