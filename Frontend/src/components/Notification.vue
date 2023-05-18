<template>
  <div>
    <template v-if="hasMessage">
      <div :class="[notificationClasses]">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Add your notification icon here -->
          </div>
          <div class="ml-3">
            <h3 class="text-sm leading-5 font-medium text-red-800">Errors</h3>
            <div class="mt-2 text-sm leading-5 text-red-700">{{ message }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      timer: null,
    };
  },
  props: {
    message: {
      type: Array,
      default: "",
    },
    timeout: {
      type: Number,
      default: 5000, // 5 seconds
    },
  },
  created() {
    this.timer = setTimeout(() => {
      this.visible = false;
    }, this.timeout);
  },
  computed: {
    notificationClasses() {
      return {
        "rounded-md bg-red-100 p-4": true,
        hidden: !this.visible,
        fixed: true,
        "bottom-20": true,
        "right-20": true,
      };
    },
    hasMessage() {
      return this.message !== "";
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>
