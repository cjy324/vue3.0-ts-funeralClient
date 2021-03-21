<template>

  <TitleBar>요청서 수정 페이지</TitleBar>

  <section class="section section-article-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined" v-on:submit.prevent="checkAndModifyOrder">
          <FormRow title="제목">
            <input ref="modifiedOrderTitleElRef" class="form-row-input" type="text" :value="state.order.title">
          </FormRow>
          <FormRow title="장례식장">
            <input ref="modifiedOrderFuneralHomeElRef" class="form-row-input" type="text" :value="state.order.funeralHome">
          </FormRow>
          <FormRow title="옵션1">
            <input ref="modifiedOrderOption1ElRef" class="form-row-input" type="text" :value="state.order.option1">
            <select ref="modifiedOrderOption1qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm" :value="state.order.option1qty">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션2">
            <input ref="modifiedOrderOption2ElRef" class="form-row-input" type="text" :value="state.order.option2">
            <select ref="modifiedOrderOption2qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm" :value="state.order.option2qty">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션3">
            <input ref="modifiedOrderOption3ElRef" class="form-row-input" type="text" :value="state.order.option3">
            <select ref="modifiedOrderOption3qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm" :value="state.order.option3qty">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션4">
            <input ref="modifiedOrderOption4ElRef" class="form-row-input" type="text" :value="state.order.option4">
            <select ref="modifiedOrderOption4qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm" :value="state.order.option4qty">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션5">
            <input ref="modifiedOrderOption5ElRef" class="form-row-input" type="text" :value="state.order.option5">
            <select ref="modifiedOrderOption5qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm" :value="state.order.option5qty">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="추가 요청 사항">
            <textarea ref="modifiedOrderBodyElRef" class="form-row-input" :value="state.order.body"></textarea>
          </FormRow>
          <FormRow title="완료">
            <div class="btns">
              <input type="submit" value="완료" class="btn-primary" />
            </div>
          </FormRow>
        </form>
        <div v-else>
          <router-link class="btn-link" to="/member/login">로그인</router-link> 후 이용해주세요.
        </div>
      </div>
    </div>
  </section>


</template>

<script lang="ts">
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, watch } from 'vue'
import { MainApi } from '../apis'
import { Router } from 'vue-router'
import { IOrder } from '../types'


export default defineComponent({
  name: 'AddOrderPage',

  props: {
    globalShare: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },

  setup(props){
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const modifiedOrderTitleElRef = ref<HTMLInputElement>();
    const modifiedOrderFuneralHomeElRef = ref<HTMLInputElement>();
    const modifiedOrderOption1ElRef = ref<HTMLInputElement>();
    const modifiedOrderOption1qtyElRef = ref<HTMLInputElement>();
    const modifiedOrderOption2ElRef = ref<HTMLInputElement>();
    const modifiedOrderOption2qtyElRef = ref<HTMLInputElement>();
    const modifiedOrderOption3ElRef = ref<HTMLInputElement>();
    const modifiedOrderOption3qtyElRef = ref<HTMLInputElement>();
    const modifiedOrderOption4ElRef = ref<HTMLInputElement>();
    const modifiedOrderOption4qtyElRef = ref<HTMLInputElement>();
    const modifiedOrderOption5ElRef = ref<HTMLInputElement>();
    const modifiedOrderOption5qtyElRef = ref<HTMLInputElement>();
    const modifiedOrderBodyElRef = ref<HTMLInputElement>();

    const state = reactive({
      order: {} as IOrder
    });

    function loadOrder(id:number) {
      mainApi.order_detail(id)
      .then(axiosResponse => {
        state.order = axiosResponse.data.body.order;
      });
    }
    onMounted(() => {
      loadOrder(props.id);
    });
    watch(() => props.id, (newValue, oldValue) => {
      loadOrder(props.id);
    })

    /* 공백 체크 */
    function checkAndModifyOrder(){

      //일반적으로 안해도 되지만 typescript에서는 해야됨
      //제목
      if(modifiedOrderTitleElRef.value == null){
        return;
      }

      const modifiedOrderTitleEl = modifiedOrderTitleElRef.value;
      modifiedOrderTitleEl.value = modifiedOrderTitleEl.value.trim();

      if(modifiedOrderTitleEl.value.length == 0){
        alert('제목을 입력해 주세요.')
        modifiedOrderTitleEl.focus();
        return;
      }

      //장례식장
      if(modifiedOrderFuneralHomeElRef.value == null){
        return;
      }

      const modifiedOrderFuneralHomeEl = modifiedOrderFuneralHomeElRef.value;
      modifiedOrderFuneralHomeEl.value = modifiedOrderFuneralHomeEl.value.trim();

      if(modifiedOrderFuneralHomeEl.value.length == 0){
        alert('장례식장명을 입력해 주세요.')
        modifiedOrderFuneralHomeEl.focus();
        return;
      }

      //옵션1
      if(modifiedOrderOption1ElRef.value == null){
        return;
      }

      const modifiedOrderOption1El = modifiedOrderOption1ElRef.value;
      modifiedOrderOption1El.value = modifiedOrderOption1El.value.trim();

      if(modifiedOrderOption1El.value.length == 0){
        alert('옵션1을 입력해 주세요.')
        modifiedOrderOption1El.focus();
        return;
      }

      //옵션1qty
      if(modifiedOrderOption1qtyElRef.value == null){
        return;
      }

      const modifiedOrderOption1qtyEl = modifiedOrderOption1qtyElRef.value;

      //옵션2
      if(modifiedOrderOption2ElRef.value == null){
        return;
      }

      const modifiedOrderOption2El = modifiedOrderOption2ElRef.value;
      modifiedOrderOption2El.value = modifiedOrderOption2El.value.trim();

      if(modifiedOrderOption1El.value.length == 0){
        alert('옵션2를 입력해 주세요.')
        modifiedOrderOption2El.focus();
        return;
      }

      //옵션2qty
      if(modifiedOrderOption2qtyElRef.value == null){
        return;
      }

      const modifiedOrderOption2qtyEl = modifiedOrderOption2qtyElRef.value;

      //옵션3
      if(modifiedOrderOption3ElRef.value == null){
        return;
      }

      const modifiedOrderOption3El = modifiedOrderOption3ElRef.value;
      modifiedOrderOption3El.value = modifiedOrderOption3El.value.trim();

      if(modifiedOrderOption3El.value.length == 0){
        alert('옵션3을 입력해 주세요.')
        modifiedOrderOption3El.focus();
        return;
      }

      //옵션3qty
      if(modifiedOrderOption3qtyElRef.value == null){
        return;
      }

      const modifiedOrderOption3qtyEl = modifiedOrderOption3qtyElRef.value;

      //옵션4
      if(modifiedOrderOption4ElRef.value == null){
        return;
      }

      const modifiedOrderOption4El = modifiedOrderOption4ElRef.value;
      modifiedOrderOption4El.value = modifiedOrderOption4El.value.trim();

      if(modifiedOrderOption4El.value.length == 0){
        alert('옵션4를 입력해 주세요.')
        modifiedOrderOption4El.focus();
        return;
      }

      //옵션4qty
      if(modifiedOrderOption4qtyElRef.value == null){
        return;
      }

      const modifiedOrderOption4qtyEl = modifiedOrderOption4qtyElRef.value;

      //옵션5
      if(modifiedOrderOption5ElRef.value == null){
        return;
      }

      const modifiedOrderOption5El = modifiedOrderOption5ElRef.value;
      modifiedOrderOption5El.value = modifiedOrderOption5El.value.trim();

      if(modifiedOrderOption5El.value.length == 0){
        alert('옵션5를 입력해 주세요.')
        modifiedOrderOption5El.focus();
        return;
      }

      //옵션5qty
      if(modifiedOrderOption5qtyElRef.value == null){
        return;
      }

      const modifiedOrderOption5qtyEl = modifiedOrderOption5qtyElRef.value;


      //body
      if(modifiedOrderBodyElRef.value == null){
        return;
      }

      const modifiedOrderBodyEl = modifiedOrderBodyElRef.value;
      modifiedOrderBodyEl.value = modifiedOrderBodyEl.value.trim();

      if(modifiedOrderBodyEl.value.length == 0){
        alert('내용을 입력해 주세요.')
        modifiedOrderBodyEl.focus();
        return;
      }

      // 작성 함수로 보내기
      modifyOrder(props.id, modifiedOrderTitleEl.value, modifiedOrderFuneralHomeEl.value, modifiedOrderOption1El.value, parseInt(modifiedOrderOption1qtyEl.value), modifiedOrderOption2El.value, parseInt(modifiedOrderOption2qtyEl.value), modifiedOrderOption3El.value, parseInt(modifiedOrderOption3qtyEl.value), modifiedOrderOption4El.value, parseInt(modifiedOrderOption4qtyEl.value), modifiedOrderOption5El.value, parseInt(modifiedOrderOption5qtyEl.value), modifiedOrderBodyEl.value, state.order.directorId, props.globalShare.loginedMember.id);

    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function modifyOrder(id:number, title:string, funeralHome:string, option1:string, option1qty:number, option2:string, option2qty:number, option3:string, option3qty:number, option4:string, option4qty:number, option5:string, option5qty:number, body:string, directorId:number, clientId:number){
       
        mainApi.order_doModify(id, title, funeralHome, option1, option1qty, option2, option2qty, option3, option3qty, option4, option4qty, option5, option5qty, body, directorId, clientId)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          
          // 로그인이 fail 상태이면 리턴
          if ( axiosResponse.data.fail ) {
            return;
          }

          //authKey가 있는 상태에서 가능
          const modifiedOrderId = axiosResponse.data.body.id;
          //alert(modifiedArticleId + "번 게시물 등록 완료!!");

          router.replace("detail?id=" + modifiedOrderId);
        });
      }

    return{
        state,
        modifiedOrderTitleElRef,
        modifiedOrderFuneralHomeElRef,
        modifiedOrderOption1ElRef,
        modifiedOrderOption1qtyElRef,
        modifiedOrderOption2ElRef,
        modifiedOrderOption2qtyElRef,
        modifiedOrderOption3ElRef,
        modifiedOrderOption3qtyElRef,
        modifiedOrderOption4ElRef,
        modifiedOrderOption4qtyElRef,
        modifiedOrderOption5ElRef,
        modifiedOrderOption5qtyElRef,
        modifiedOrderBodyElRef,
        checkAndModifyOrder,
      
    }

  }
  
})
</script>

<style scoped>

</style>