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
          <FormRow title="예상인원">
            예상인원
            <select ref="newOrderHeadElRef" class="form-row-input w-full rounded-sm">
						  <option value="100">100명</option>
						  <option value="200">200명</option>
						  <option value="300">300명</option>
						  <option value="400">400명</option>
						  <option value="500">500명</option>
					  </select>
          </FormRow>
          <FormRow title="종교">
            <select ref="newOrderReligionElRef" class="form-row-input w-full rounded-sm">
						  <option value="기독교">기독교</option>
						  <option value="천주교">천주교</option>
						  <option value="불교">불교</option>
						  <option value="기타">기타</option>
					  </select>
          </FormRow>
          <FormRow title="시작일">
            <input ref="newOrderStartDateElRef" class="form-row-input" type="date" placeholder="시작일을 입력해주세요.">
          </FormRow>
          <FormRow title="종료일">
            <input ref="newOrderEndDateElRef" class="form-row-input" type="date" placeholder="종료일을 입력해주세요.">
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
          <router-link class="btn-link" to="/client/login">로그인</router-link> 후 이용해주세요.
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
    expertId: {
      type: Number,
      required: true
    }
  },

  setup(props){
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const newOrderTitleElRef = ref<HTMLInputElement>();
    const newOrderFuneralHomeElRef = ref<HTMLInputElement>();
    const newOrderHeadElRef = ref<HTMLInputElement>();
    const newOrderReligionElRef = ref<HTMLInputElement>();
    const newOrderStartDateElRef = ref<HTMLInputElement>();
    const newOrderEndDateElRef = ref<HTMLInputElement>();
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

      //장례인원
      if(newOrderHeadElRef.value == null){
        return;
      }

      const newOrderHeadEl = newOrderHeadElRef.value;

      //종교
      if(newOrderReligionElRef.value == null){
        return;
      }

      const newOrderReligionEl = newOrderReligionElRef.value;

      //시작일
      if(newOrderStartDateElRef.value == null){
        return;
      }

      const newOrderStartDateEl = newOrderStartDateElRef.value;
      newOrderStartDateEl.value = newOrderStartDateEl.value.trim();

      if(newOrderStartDateEl.value.length == 0){
        alert('시작일을 입력해 주세요.')
        newOrderStartDateEl.focus();
        return;
      }

      //종료일
      if(newOrderEndDateElRef.value == null){
        return;
      }

      const newOrderEndDateEl = newOrderEndDateElRef.value;
      newOrderEndDateEl.value = newOrderEndDateEl.value.trim();

      if(newOrderEndDateEl.value.length == 0){
        alert('종료일을 입력해 주세요.')
        newOrderEndDateEl.focus();
        return;
      }

      //body
      if(newOrderBodyElRef.value == null){
        return;
      }

      const newOrderBodyEl = newOrderBodyElRef.value;
      newOrderBodyEl.value = newOrderBodyEl.value.trim();

      if(newOrderBodyEl.value.length == 0){
        return newOrderBodyEl.value = '추가요청사항이 없습니다.';
      }

      // 작성 함수로 보내기
      addOrder(newOrderTitleEl.value, newOrderFuneralHomeEl.value, parseInt(newOrderHeadEl.value), newOrderReligionEl.value, newOrderStartDateEl.value, newOrderEndDateEl.value, newOrderBodyEl.value, props.expertId, props.globalShare.loginedClient.id);

    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function addOrder(title:string, funeralHome:string, head:number, religion:string, startDate:string, endDate:string, body:string, expertId:number, clientId:number){
       
        mainApi.order_doAdd(title, funeralHome, head, religion, startDate, endDate, body, expertId, clientId)
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
        newOrderHeadElRef,
        newOrderReligionElRef,
        newOrderStartDateElRef,
        newOrderEndDateElRef,
        newOrderBodyElRef,
        checkAndAddOrder,
      
    }

  }
  
})
</script>

<style scoped>

</style>