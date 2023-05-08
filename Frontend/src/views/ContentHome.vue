<template>
  <div
    class="relative overflow-hidden bg-cover bg-no-repeat h-screen background">
    <div
      class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
      <div class="flex h-full items-end justify-center pb-64 pl-96">
        <div class="px-6 text-center text-white md:px-12">
          <button
            type="button"
            class="inline-block rounded border-2 border-red-500 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-red-500"
            data-te-ripple-init
            data-te-ripple-color="light"
            @click="$router.push('/dashboard')">
            Get started
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContentHome",
};
</script>
