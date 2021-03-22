<template>

  <TitleBar>요청사항 작성 페이지</TitleBar>

  <section class="section section-order-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined" v-on:submit.prevent="checkAndAddOrder">
          <FormRow title="제목">
            <input ref="newOrderTitleElRef" class="form-row-input" type="text" placeholder="제목을 입력해주세요.">
          </FormRow>
          <FormRow title="장례식장">
            <input ref="newOrderFuneralHomeElRef" class="form-row-input" type="text" placeholder="장례식장명을 입력해주세요.">
          </FormRow>
          <FormRow title="옵션1">
            <input ref="newOrderOption1ElRef" class="form-row-input" type="text" placeholder="옵션1을 입력해주세요.">
            <select ref="newOrderOption1qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션2">
            <input ref="newOrderOption2ElRef" class="form-row-input" type="text" placeholder="옵션2을 입력해주세요.">
            <select ref="newOrderOption2qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션3">
            <input ref="newOrderOption3ElRef" class="form-row-input" type="text" placeholder="옵션3을 입력해주세요.">
            <select ref="newOrderOption3qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션4">
            <input ref="newOrderOption4ElRef" class="form-row-input" type="text" placeholder="옵션4을 입력해주세요.">
            <select ref="newOrderOption4qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="옵션5">
            <input ref="newOrderOption5ElRef" class="form-row-input" type="text" placeholder="옵션5을 입력해주세요.">
            <select ref="newOrderOption5qtyElRef" name="option1qty" class="form-row-input w-full rounded-sm">
						  <option value="1">1</option>
						  <option value="2">2</option>
						  <option value="3">3</option>
						  <option value="4">4</option>
						  <option value="5">5</option>
					  </select>
          </FormRow>
          <FormRow title="추가 요청 사항">
            <textarea ref="newOrderBodyElRef" class="form-row-input" placeholder="내용을 입력해주세요."></textarea>
          </FormRow>
          <FormRow title="작성">
            <div class="btns">
              <input type="submit" value="작성" class="btn-primary" />
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
import { defineComponent, reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { MainApi } from '../apis'
import { Router } from 'vue-router'


export default defineComponent({
  name: 'OrderAddPage',

  props: {
    globalShare: {
      type: Object,
      required: true
    },
    directorId: {
      type: Number,
      required: true
    }
  },

  setup(props){
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const newOrderTitleElRef = ref<HTMLInputElement>();
    const newOrderFuneralHomeElRef = ref<HTMLInputElement>();
    const newOrderOption1ElRef = ref<HTMLInputElement>();
    const newOrderOption1qtyElRef = ref<HTMLInputElement>();
    const newOrderOption2ElRef = ref<HTMLInputElement>();
    const newOrderOption2qtyElRef = ref<HTMLInputElement>();
    const newOrderOption3ElRef = ref<HTMLInputElement>();
    const newOrderOption3qtyElRef = ref<HTMLInputElement>();
    const newOrderOption4ElRef = ref<HTMLInputElement>();
    const newOrderOption4qtyElRef = ref<HTMLInputElement>();
    const newOrderOption5ElRef = ref<HTMLInputElement>();
    const newOrderOption5qtyElRef = ref<HTMLInputElement>();
    const newOrderBodyElRef = ref<HTMLInputElement>();

    /* 공백 체크 */
    function checkAndAddOrder(){

      //일반적으로 안해도 되지만 typescript에서는 해야됨
      //제목
      if(newOrderTitleElRef.value == null){
        return;
      }

      const newOrderTitleEl = newOrderTitleElRef.value;
      newOrderTitleEl.value = newOrderTitleEl.value.trim();

      if(newOrderTitleEl.value.length == 0){
        alert('제목을 입력해 주세요.')
        newOrderTitleEl.focus();
        return;
      }

      //장례식장
      if(newOrderFuneralHomeElRef.value == null){
        return;
      }

      const newOrderFuneralHomeEl = newOrderFuneralHomeElRef.value;
      newOrderFuneralHomeEl.value = newOrderFuneralHomeEl.value.trim();

      if(newOrderFuneralHomeEl.value.length == 0){
        alert('장례식장명을 입력해 주세요.')
        newOrderFuneralHomeEl.focus();
        return;
      }

      //옵션1
      if(newOrderOption1ElRef.value == null){
        return;
      }

      const newOrderOption1El = newOrderOption1ElRef.value;
      newOrderOption1El.value = newOrderOption1El.value.trim();

      if(newOrderOption1El.value.length == 0){
        alert('옵션1을 입력해 주세요.')
        newOrderOption1El.focus();
        return;
      }

      //옵션1qty
      if(newOrderOption1qtyElRef.value == null){
        return;
      }

      const newOrderOption1qtyEl = newOrderOption1qtyElRef.value;

      //옵션2
      if(newOrderOption2ElRef.value == null){
        return;
      }

      const newOrderOption2El = newOrderOption2ElRef.value;
      newOrderOption2El.value = newOrderOption2El.value.trim();

      if(newOrderOption1El.value.length == 0){
        alert('옵션2를 입력해 주세요.')
        newOrderOption2El.focus();
        return;
      }

      //옵션2qty
      if(newOrderOption2qtyElRef.value == null){
        return;
      }

      const newOrderOption2qtyEl = newOrderOption2qtyElRef.value;

      //옵션3
      if(newOrderOption3ElRef.value == null){
        return;
      }

      const newOrderOption3El = newOrderOption3ElRef.value;
      newOrderOption3El.value = newOrderOption3El.value.trim();

      if(newOrderOption3El.value.length == 0){
        alert('옵션3을 입력해 주세요.')
        newOrderOption3El.focus();
        return;
      }

      //옵션3qty
      if(newOrderOption3qtyElRef.value == null){
        return;
      }

      const newOrderOption3qtyEl = newOrderOption3qtyElRef.value;

      //옵션4
      if(newOrderOption4ElRef.value == null){
        return;
      }

      const newOrderOption4El = newOrderOption4ElRef.value;
      newOrderOption4El.value = newOrderOption4El.value.trim();

      if(newOrderOption4El.value.length == 0){
        alert('옵션4를 입력해 주세요.')
        newOrderOption4El.focus();
        return;
      }

      //옵션4qty
      if(newOrderOption4qtyElRef.value == null){
        return;
      }

      const newOrderOption4qtyEl = newOrderOption4qtyElRef.value;

      //옵션5
      if(newOrderOption5ElRef.value == null){
        return;
      }

      const newOrderOption5El = newOrderOption5ElRef.value;
      newOrderOption5El.value = newOrderOption5El.value.trim();

      if(newOrderOption5El.value.length == 0){
        alert('옵션5를 입력해 주세요.')
        newOrderOption5El.focus();
        return;
      }

      //옵션5qty
      if(newOrderOption5qtyElRef.value == null){
        return;
      }

      const newOrderOption5qtyEl = newOrderOption5qtyElRef.value;


      //body
      if(newOrderBodyElRef.value == null){
        return;
      }

      const newOrderBodyEl = newOrderBodyElRef.value;
      newOrderBodyEl.value = newOrderBodyEl.value.trim();

      if(newOrderBodyEl.value.length == 0){
        alert('내용을 입력해 주세요.')
        newOrderBodyEl.focus();
        return;
      }

      // 작성 함수로 보내기
      addOrder(newOrderTitleEl.value, newOrderFuneralHomeEl.value, newOrderOption1El.value, parseInt(newOrderOption1qtyEl.value), newOrderOption2El.value, parseInt(newOrderOption2qtyEl.value), newOrderOption3El.value, parseInt(newOrderOption3qtyEl.value), newOrderOption4El.value, parseInt(newOrderOption4qtyEl.value), newOrderOption5El.value, parseInt(newOrderOption5qtyEl.value), newOrderBodyEl.value, props.directorId, props.globalShare.loginedMember.id);

    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function addOrder(title:string, funeralHome:string, option1:string, option1qty:number, option2:string, option2qty:number, option3:string, option3qty:number, option4:string, option4qty:number, option5:string, option5qty:number, body:string, directorId:number, clientId:number){
       
        mainApi.order_doAdd(title, funeralHome, option1, option1qty, option2, option2qty, option3, option3qty, option4, option4qty, option5, option5qty, body, directorId, clientId)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          
          // 로그인이 fail 상태이면 리턴
          if ( axiosResponse.data.fail ) {
            return;
          }

          //authKey가 있는 상태에서 가능
          const newOrderId = axiosResponse.data.body.id;
          //alert(newArticleId + "번 게시물 등록 완료!!");

          router.replace("detail?id=" + newOrderId);
        });
      }

    return{
        newOrderTitleElRef,
        newOrderFuneralHomeElRef,
        newOrderOption1ElRef,
        newOrderOption1qtyElRef,
        newOrderOption2ElRef,
        newOrderOption2qtyElRef,
        newOrderOption3ElRef,
        newOrderOption3qtyElRef,
        newOrderOption4ElRef,
        newOrderOption4qtyElRef,
        newOrderOption5ElRef,
        newOrderOption5qtyElRef,
        newOrderBodyElRef,
        checkAndAddOrder,
      
    }

  }
  
})
</script>

<style scoped>

</style>