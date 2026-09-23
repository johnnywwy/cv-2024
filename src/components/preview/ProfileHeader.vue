<script setup lang="ts">
import type { ResumeDocument } from '../../types/resume'
defineProps<{ profile: ResumeDocument['profile'] }>()
</script>
<template>
  <header
    class="profile-header flex items-start justify-between gap-6 border-b border-slate-100 pb-5"
  >
    <div class="min-w-0">
      <h1>{{ profile.name || '你的姓名' }}</h1>
      <p class="mt-2.5 text-[1.03em] tracking-wide text-slate-600">
        {{
          [profile.gender, profile.age && `${profile.age}岁`, profile.role, profile.location]
            .filter(Boolean)
            .join(' ｜ ')
        }}
      </p>
      <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[.82em] text-slate-500">
        <span v-if="profile.phone">手机：{{ profile.phone }}</span>
        <span v-if="profile.email">邮箱：{{ profile.email }}</span>
        <span v-if="profile.wechat">微信：{{ profile.wechat }}</span>
      </div>
    </div>
    <img
      v-if="profile.showAvatar && profile.avatar"
      :src="profile.avatar"
      alt="个人照片"
      class="h-24 w-20 shrink-0 rounded object-cover"
    />
  </header>
</template>
