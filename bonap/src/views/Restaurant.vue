<template>
    <p>nom du restaurant</p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    restaurant: {
        type: Object,
        required: true
    }
});
</script>