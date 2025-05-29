<script setup>
import { ref, watch, reactive } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "Upload Files",
  },
  placeholder: {
    type: String,
    default: "Drag and drop files here or click to upload",
  },
  error: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
  accept: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  maxSizeMB: {
    type: Number,
    default: 10, // per file
  },
  maxFiles: {
    type: Number,
    default: 10,
  },
  uploadFn: {
    type: Function,
    default: null, // function to handle file upload
  },
});

const emit = defineEmits(["update:modelValue", "error"]);

const files = ref([]);
const error = ref("");
const dragOver = ref(false);
const input = ref(null);

const isImage = (file) => file.type.startsWith("image/");

const formattedSize = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";

const simulateUpload = (file) => {
  file.progress = 0;
  const interval = setInterval(() => {
    if (file.progress >= 100) {
      clearInterval(interval);
    } else {
      file.progress += 5;
    }
  }, 100);
};

const handleFiles = (fileList) => {
  error.value = "";
  const incoming = Array.from(fileList);

  if (!props.multiple && incoming.length > 1) {
    error.value = "Only one file allowed.";
    emit("error", error.value);
    return;
  }

  if (props.multiple && incoming.length + files.value.length > props.maxFiles) {
    error.value = `Maximum ${props.maxFiles} files allowed.`;
    emit("error", error.value);
    return;
  }

  const valid = incoming.filter((file) => {
    if (file.size / 1024 / 1024 > props.maxSizeMB) {
      error.value = `File "${file.name}" exceeds ${props.maxSizeMB}MB.`;
      emit("error", error.value);
      return false;
    }
    if (
      props.accept &&
      !props.accept.split(",").some((type) => {
        type = type.trim().toLowerCase();
        return file.type.includes(type) || file.name.toLowerCase().endsWith(type);
      })
    ) {
      error.value = `File type not accepted: ${file.name}`;
      emit("error", error.value);
      return false;
    }
    return true;
  });

  if (!valid.length) return;

  valid.forEach((file) => {
    file.progress = 0;
    simulateUpload(file);
  });

  if (props.multiple) {
    files.value.push(...valid);
    emit("update:modelValue", files.value);
  } else {
    files.value = [valid[0]];
    emit("update:modelValue", valid[0]);
  }
};

const handleDrop = (e) => {
  dragOver.value = false;
  e.preventDefault();
  handleFiles(e.dataTransfer.files);
};

const removeFile = (index) => {
  files.value.splice(index, 1);
  emit("update:modelValue", files.value);
};
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block mb-2 text-sm font-medium">{{ label }}</label>

    <div
      class="relative w-full border-2 border-dashed rounded p-4 transition-all"
      :class="{
        'border-blue-400 bg-blue-50': dragOver,
        'border-gray-300': !dragOver,
        'cursor-not-allowed opacity-60': error,
      }"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop="handleDrop"
    >
      <input
        type="file"
        class="hidden"
        :multiple="multiple"
        :accept="accept"
        @change="(e) => handleFiles(e.target.files)"
        ref="input"
      />

      <div class="flex flex-col items-center space-y-2 text-center">
        <p class="text-sm text-gray-500">
          Drag & drop or
          <BaseButton size="sm" class="ml-2" @click="input?.click()"
            >Choose file</BaseButton
          >
        </p>
        <p class="text-xs text-gray-400">
          Max {{ maxFiles }} files, {{ maxSizeMB }}MB each
        </p>
      </div>
    </div>

    <p v-if="error" class="text-red-600 text-sm mt-1">{{ error }}</p>

    <ul v-if="files.length" class="mt-4 space-y-2">
      <li
        v-for="(file, index) in files"
        :key="file.name + index"
        class="flex flex-col gap-1 bg-gray-100 p-2 rounded text-sm"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <img
              v-if="isImage(file)"
              :src="URL.createObjectURL(file)"
              alt="preview"
              class="w-10 h-10 object-cover rounded"
            />
            <div>
              <p class="font-medium">{{ file.name }}</p>
              <p class="text-xs text-gray-500">{{ formattedSize(file.size) }}</p>
            </div>
          </div>
          <button
            type="button"
            @click="removeFile(index)"
            class="ml-4 text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
        <div class="w-full bg-gray-200 h-2 rounded overflow-hidden">
          <div
            class="h-full bg-blue-500 transition-all"
            :style="{ width: file.progress + '%' }"
          ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
input[type="file"] {
  display: none;
}
</style>
