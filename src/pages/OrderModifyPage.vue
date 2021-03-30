<template>

  <TitleBar>요청서 수정 페이지</TitleBar>

  <section class="section section-article-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined" v-on:submit.prevent="checkAndModifyOrder">
          <FormRow title="제목">
            <input ref="modifiedOrderTitleElRef" class="form-row-input" type="text" placeholder="제목을 입력해주세요." :value="state.order.title">
          </FormRow>
          <FormRow title="장례식장">
            <input ref="modifiedOrderFuneralHomeElRef" class="form-row-input" type="text" placeholder="장례식장명을 입력해주세요." :value="state.order.funeralHome">
          </FormRow>
          <FormRow title="예상인원">
            예상인원
            <select ref="modifiedOrderHeadElRef" class="form-row-input w-full rounded-sm" :value="state.order.head">
						  <option value="100">100명</option>
						  <option value="200">200명</option>
						  <option value="300">300명</option>
						  <option value="400">400명</option>
						  <option value="500">500명</option>
					  </select>
          </FormRow>
          <FormRow title="종교">
            <select ref="modifiedOrderReligionElRef" class="form-row-input w-full rounded-sm" :value="state.order.religion">
						  <option value="기독교">기독교</option>
						  <option value="천주교">천주교</option>
						  <option value="불교">불교</option>
						  <option value="기타">기타</option>
					  </select>
          </FormRow>
          <FormRow title="시작일">
            <div>
              {{ state.order.startDate }}
            </div>
            <input ref="modifiedOrderStartDateElRef" class="form-row-input" type="date" :value="state.order.startDate">
          </FormRow>
          <FormRow title="종료일">
            <div>
              {{ state.order.endDate }}
            </div>
            <input ref="modifiedOrderEndDateElRef" class="form-row-input" type="date" :value="state.order.endDate">
          </FormRow>
          <FormRow title="추가 요청 사항">
            <textarea ref="modifiedOrderBodyElRef" class="form-row-input" placeholder="내용을 입력해주세요." :value="state.order.body"></textarea>
          </FormRow>
            <div class="btns">
              <input type="submit" value="완료" class="btn-primary" />
              <router-link :to="'/order/detail?id='+ state.order.id" class="btn-warning">취소</router-link>
            </div>
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
    const modifiedOrderHeadElRef = ref<HTMLInputElement>();
    const modifiedOrderReligionElRef = ref<HTMLInputElement>();
    const modifiedOrderStartDateElRef = ref<HTMLInputElement>();
    const modifiedOrderEndDateElRef = ref<HTMLInputElement>();
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

      //장례인원
      if(modifiedOrderHeadElRef.value == null){
        return;
      }

      const modifiedOrderHeadEl = modifiedOrderHeadElRef.value;

      //종교
      if(modifiedOrderReligionElRef.value == null){
        return;
      }

      const modifiedOrderReligionEl = modifiedOrderReligionElRef.value;

      //시작일
      if(modifiedOrderStartDateElRef.value == null){
        return;
      }

      const modifiedOrderStartDateEl = modifiedOrderStartDateElRef.value;
      modifiedOrderStartDateEl.value = modifiedOrderStartDateEl.value.trim();

      if(modifiedOrderStartDateEl.value.length == 0){
        alert('시작일을 입력해 주세요.')
        modifiedOrderStartDateEl.focus();
        return;
      }

      //종료일
      if(modifiedOrderEndDateElRef.value == null){
        return;
      }

      const modifiedOrderEndDateEl = modifiedOrderEndDateElRef.value;
      modifiedOrderEndDateEl.value = modifiedOrderEndDateEl.value.trim();

      if(modifiedOrderEndDateEl.value.length == 0){
        alert('종료일을 입력해 주세요.')
        modifiedOrderEndDateEl.focus();
        return;
      }


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
      modifyOrder(props.id, modifiedOrderTitleEl.value, modifiedOrderFuneralHomeEl.value, parseInt(modifiedOrderHeadEl.value), modifiedOrderReligionEl.value, modifiedOrderStartDateEl.value, modifiedOrderEndDateEl.value, modifiedOrderBodyEl.value, state.order.expertId, props.globalShare.loginedClient.id);

    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function modifyOrder(id:number, title:string, funeralHome:string, head:number, religion:string, startDate:string, endDate:string, body:string, expertId:number, clientId:number){
       
        mainApi.order_doModify(id, title, funeralHome, head, religion, startDate, endDate, body, expertId, clientId)
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
        modifiedOrderHeadElRef,
        modifiedOrderReligionElRef,
        modifiedOrderStartDateElRef,
        modifiedOrderEndDateElRef,
        modifiedOrderBodyElRef,
        checkAndModifyOrder,
      
    }

  }
  
})
</script>

<style scoped>

</style>