<script setup lang="ts">
import { ref } from 'vue'
import type { ResumeDocument } from '../../types/resume'
import { readAvatar } from '../../lib/files'
import { profileFields } from '../../config/editor'
import FieldGroup from './FieldGroup.vue'
import AppIcon from '../AppIcon.vue'
const profile = defineModel<ResumeDocument['profile']>({ required: true })
const imageError = ref('')
async function upload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    profile.value.avatar = await readAvatar(file)
    profile.value.showAvatar = true
    imageError.value = ''
  } catch (error) {
    imageError.value = (error as Error).message
  }
  input.value = ''
}
</script>
<template>
  <div class="space-y-5">
    <div
      class="flex items-center gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4"
    >
      <img
        v-if="profile.avatar"
        :src="profile.avatar"
        alt="当前头像"
        class="h-16 w-16 rounded-xl object-cover"
      />
      <div
        v-else
        class="flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-50 text-indigo-300"
      >
        <AppIcon name="person" :size="30" />
      </div>
      <div class="min-w-0">
        <label class="btn relative text-xs">
          更换照片
          <input
            aria-label="上传头像"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            class="absolute inset-0 w-full cursor-pointer opacity-0"
            @change="upload"
          />
        </label>
        <p class="mt-1.5 text-[10px] text-slate-400">JPG / PNG / WebP，最大 2 MB</p>
      </div>
      <label class="ml-auto flex items-center gap-1 text-xs text-slate-500">
        <input v-model="profile.showAvatar" type="checkbox" class="accent-indigo-600" />
        显示
      </label>
    </div>
    <p v-if="imageError" role="alert" class="text-xs text-red-600">{{ imageError }}</p>
    <FieldGroup v-model="profile" :fields="profileFields" columns />
    <div class="mt-8 rounded-xl bg-indigo-50/60 p-4 text-xs leading-6 text-indigo-600">
      <div class="mb-1 font-semibold">专注内容，排版交给我们</div>
      切换上方章节填写经历，右侧会实时更新。所有修改仅保存在当前浏览器，记得定期导出备份。
    </div>
  </div>
</template>
