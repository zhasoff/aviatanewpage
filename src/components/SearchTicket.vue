<template>
  <div class="search-ticket">
    <div class="find_ticket">
      <div class="find_ticket_button d-flex">
        <button
            type="button"
            v-bind:class="`btn`"
            v-for="(menu, index) in NameButton"
            :key="index"
            @click="type == `{{menu.id}}`"
        >
          {{ menu.name }}
        </button>
      </div>
      <div class="find_ticket_input">
        <div class="input-group justify-content-between">
          <div>
            <input type="text" class="form form-from" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <img class="form-arrow-img" src="https://aviata.kz/static/images/new/arrows.png" alt="arrow"/>
          </div>
          <div>
            <input type="text" class="form form-to" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" class="form form-date-from" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" class="form form-date-to" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" class="form form-date" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" class="form form-selector" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <button type="button" class="btn btn-success">Найти</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchTicket',
  props: {
    msg: String
  },
  data() {
    return {
      NameButton: [
        { name: "ТУДА И ОБРАТНО", id: 'roundtrip'},
        { name: "В ОДНУ СТОРОНУ", id: 'oneway'},
      ],
    };
  },
}
</script>
<style>
.find_ticket {
  background-color: #FFFFFF;
  top: 22.04px;
  position: relative;
  padding: 16px 18.61px 16px 18.61px;
  height: 111px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
.btn {
  /*background-color: rgba(255, 255, 255, 0.97);*/
  font-size: 14px;
  line-height: 16px;
  color: black;
  border: none;
}
.form{
  background: #E5E5E5;
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  border-radius: 4px;
  height: 44px;
  top: 51px;
}
.form-from {
  width: 209.39px;
}
.form-to {
  width: 209.39px;
}
.form-date {
  width: 209.39px;
}
.form-date-from {
  width: 127.96px;

}
.form-date-to {
  width: 127.96px;

}
.form-date {
  width: 209.39px;
  display: none;
}
.form-selector {
  width: 209.39px;
}
.btn-success {
  width: 139.59px;
  height: 44px;
  background-color: #55BB06;
  color: #FFFFFF;
}
.form-arrow-img {
  height: 20px;
  width: 23.27px;
}
.input-group {
  align-items: center;
}
.button-options {

}
</style>