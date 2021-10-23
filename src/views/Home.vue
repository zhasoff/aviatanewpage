<template>
  <div class="home">
<!--    <div class="button-options">-->
<!--      <div class="button-options-track">-->
<!--        <button type="button" class="btn btn-primary">Primary</button>-->
<!--        <button type="button" class="btn btn-primary">Primary</button>-->
<!--      </div>-->
<!--      <div class="button-options-price">-->

<!--      </div>-->
<!--    </div>-->
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
    SearchTicket,
    MainTicket,
  },
  props: {
    msg: String,
  },

}
</script>
<style>

</style>
