<script setup lang="ts">
import type {NuxtError} from "#app";

defineProps<{
  error: NuxtError,
}>()
const localePath = useLocalePath()
const handleError = () => {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div>
    <h1>Error</h1>
    <p v-if="error.status === 404 ">
      {{$t('error.notFound.title') + $t('error.notFound.desc')}}
    </p>
    <p v-else>{{$t('error.generic.title') + $t('error.generic.desc')}}</p>
    <button @click="handleError">{{ $t('error.backHome') }}</button>
  </div>
</template>

<style scoped>

</style>
