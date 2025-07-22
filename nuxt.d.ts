import { NuxtApp } from '#app';

export {};

declare module '#app' {
  interface NuxtApp {
    $motion: any;
  }
}
