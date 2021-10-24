<template>
  <div class="search-ticket">
    <div class="find_ticket">
      <div class="find_ticket_button d-flex">
        <button
            class="type"
            v-for="(menu, index) in NameButton"
            :key="index"
            v-bind:class="{ 'type-active': type == `{{menu.id}}` }"
            @click="type == `{{menu.id}}`"
        >
          {{ menu.name }}
        </button>
      </div>
      <div class="find_ticket_input">
        <div class="input-group d-flex justify-content-between">
          <div>
            <input type="text" placeholder="Астана, Казахстан" class="form form-from" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" >
          </div>
          <div>
            <img class="form-arrow-img" src="https://aviata.kz/static/images/new/arrows.png" alt="arrow"/>
          </div>
          <div>
            <input type="text" placeholder="Алматы, Казахстан" class="form form-to" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" placeholder="08.11.2018" class="form form-date-from" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" placeholder="16.11.2018" class="form form-date-to" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" class="form form-date" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <input type="text" placeholder="2 пассажира" class="form form-selector" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div>
            <button type="button" class="btn btn-success">Найти</button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end additional-btns">
      <button type="button" class="pointer">
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
                d="M15.6751 10.4907V7.5473C15.6894 5.30323 14.1524 3.81482 12.8318 3.22214C12.4591 3.05524 12.0668 2.9312 11.6667 2.83662V2.63633C11.6667 1.73406 10.9191 1 10.0001 1C9.08106 1 8.33339 1.73406 8.33339 2.63633V2.86738C7.97372 2.96 7.62038 3.07323 7.28471 3.22509C5.82537 3.88551 4.34669 5.47734 4.33336 7.54534V10.4907C4.33336 12.5813 3.58135 14.3751 2.09834 15.8222C2.01001 15.9086 1.97801 16.0359 2.01534 16.1528C2.05267 16.2693 2.15368 16.356 2.27668 16.377L5.44037 16.9133C6.03704 17.0145 6.57871 17.0953 7.08838 17.1614C7.67005 18.2813 8.81239 19 10.0611 19C11.3101 19 12.4528 18.2807 13.0341 17.1604C13.5414 17.0947 14.0804 17.0141 14.6741 16.9133L17.8375 16.377C17.9605 16.3563 18.0611 16.2696 18.0988 16.1528C18.1365 16.0363 18.1045 15.9086 18.0158 15.8222C16.4625 14.3067 15.6751 12.5129 15.6751 10.4907ZM9.00006 2.63633C9.00006 2.09503 9.44873 1.65453 10.0001 1.65453C10.5514 1.65453 11.0001 2.09503 11.0001 2.63633V2.6995C10.3357 2.60721 9.65873 2.61244 9.00006 2.71586V2.63633ZM12.2018 17.258C11.6954 17.9328 10.9057 18.3451 10.0607 18.3451C9.21606 18.3451 8.42672 17.9328 7.92039 17.2586C8.05105 17.2717 8.17805 17.2825 8.30472 17.293C8.36706 17.2982 8.43106 17.3048 8.49272 17.3097C8.53839 17.3133 8.58239 17.3156 8.62739 17.3185C9.59606 17.3879 10.4884 17.3882 11.4561 17.3205C11.5127 17.3165 11.5681 17.3136 11.6254 17.3093C11.6967 17.3038 11.7707 17.2966 11.8434 17.29C11.9577 17.2802 12.0714 17.2707 12.1888 17.2589C12.1934 17.2586 12.1974 17.2583 12.2018 17.258Z"
                fill="#FF9900"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Отслеживать изменения цен
      </button>
      <button type="button" class="pointer">
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.9768 7.27985H18V16H13.9768V7.27985ZM7.9884 15.9837V9.43922H12.0116V15.9837H7.9884ZM2 16V4H6.0232V16H2Z"
              fill="#FF9900"
          />
        </svg>
        Посмотреть цены на соседние даты (+- 3дня)
      </button>
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
        { name: "ТУДА И ОБРАТНО", id: 'roundtrip', cla: 'line'},
        { name: "В ОДНУ СТОРОНУ", id: 'oneway'},
      ],
    };
  },
}
</script>
<style lang="scss">
.find_ticket_button.d-flex {
  padding-bottom: 10px;
}
.line {
  border-right: 1px solid #cccccc;
  margin-right: 14px;
  margin-left: 14px;
}
.type {
  width: 143px;
  padding-bottom: 2px;
  transition: 0.22s;
  border-bottom: 2px solid transparent;
  color: #888888;
  &:hover,
  &-active {
    color: #000000;
    border-bottom: 2px solid #55bb06;
  }
  }
.additional-btns {
  margin-top: 35px;
button {
  margin-left: 9px;
  padding: 7px 15px 8px 11px;
  font-size: 13px;
  line-height: 15px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff0cd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

&:hover {
   background: rgba(255, 240, 205, 0.8);
 }

svg {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}
}
}
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
  width: 200px;
  padding-left: 18px;
}
.form-to {
  width: 200px;
  padding-left: 18px;
}
.form-date {
  width: 209.39px;
  padding-left: 18px;
}
.form-date-from {
  width: 127.96px;
  padding-left: 18px;

}
.form-date-to {
  width: 127.96px;
  padding-left: 18px;

}
.form-date {
  width: 209.39px;
  display: none;
}
.form-selector {
  width: 209.39px;
  padding-left: 18px;
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