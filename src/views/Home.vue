<template>
  <div class="home">
    <SearchTicket />
    <MainTicket />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchTicket from '@/components/SearchTicket.vue'
import MainTicket from "@/components/MainTicket";

export default {
  name: 'Home',
  components: {
    MainTicket,
    SearchTicket,
  },
  props: {
    msg: String,
  },
}
</script>

