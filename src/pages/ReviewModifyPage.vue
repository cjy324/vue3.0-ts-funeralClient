<template>

  <TitleBar>후기/평점 작성 페이지</TitleBar>

  <section class="section section-review-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined" v-on:submit.prevent="checkAndModifyReview">
          <div title="평점" class="text-center h-24">
            <div class="btn-success">평점</div>
            <select ref="modifiedRatingPointElRef" class="text-xl h-10 mt-2 w-1/2 border" :value="state.rating.point">
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
            </select>
          </div>
          <div class="btn-success">후기 수정</div>
          <FormRow>
            <textarea ref="modifiedReviewBodyElRef" class="form-row-input border" :value="state.review.body"></textarea>
          </FormRow>
          <FormRow >
            <div class="btns">
              <input type="submit" value="완료" class="btn-primary" />
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
import { defineComponent, reactive, ref, getCurrentInstance, onMounted, vModelRadio, computed } from 'vue'
import { MainApi } from '../apis'
import { Router } from 'vue-router'
import { IReview, IRating } from '../types'
import * as Util from '../utils'


export default defineComponent({
  name: 'ReviewModifyPage',

  props: {
    globalShare: {
      type: Object,
      required: true
    },
    relId: {
      type: Number,
      required: true
    },
    relTypeCode: {
      type: String,
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

    const modifiedReviewBodyElRef = ref<HTMLInputElement>();
    const modifiedRatingPointElRef = ref<HTMLInputElement>();
    const ratingPoint1 = ref<HTMLInputElement>();
    const ratingPoint2 = ref<HTMLInputElement>();
    const ratingPoint3 = ref<HTMLInputElement>();
    const ratingPoint4 = ref<HTMLInputElement>();
    const ratingPoint5 = ref<HTMLInputElement>();

    const state = reactive({
      rating: {} as IRating,
      review: {} as IReview
      
    });

    function loadRating(relTypeCode:string, relId:number, clientId:number) {
      mainApi.rating_getRatingRelClient(relTypeCode, relId, clientId)
      .then(axiosResponse => {
        state.rating = axiosResponse.data.body.rating;
      });
    }

    function loadReview(id:number) {
      mainApi.review_detail(id)
      .then(axiosResponse => {
        state.review = axiosResponse.data.body.review;
      });
    }

    onMounted(() => {
      loadReview(props.id);
      loadRating(props.relTypeCode, props.relId, props.globalShare.loginedClient.id);
    });



    /* 공백 체크 */
    function checkAndModifyReview(){

      if(modifiedReviewBodyElRef.value == null){
        return;
      }

      const modifiedReviewBodyEl = modifiedReviewBodyElRef.value;
      modifiedReviewBodyEl.value = modifiedReviewBodyEl.value.trim();

      if(modifiedReviewBodyEl.value.length == 0){
        alert('내용을 입력해 주세요.')
        modifiedReviewBodyEl.focus();
        return;
      }

    
    const raingModify = (onSuccess:Function) => {
        mainApi.rating_doModify(props.relTypeCode, props.relId, Util.toIntOrNull(modifiedRatingPointElRef.value?.value), props.globalShare.loginedClient.id)
        .then(axiosResponse => {
          
          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          }
          else{
            onSuccess();
          }
        });
      };


      const startModifyReview = () =>{
      // 작성 함수로 보내기
          modifyReview(props.id, modifiedReviewBodyEl.value, props.globalShare.loginedClient.id);
      }

      raingModify(startModifyReview);
    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function modifyReview(id:number, body:string, clientId:number){
       
        mainApi.review_doModify(id, body, clientId)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          
          // 로그인이 fail 상태이면 리턴
          if ( axiosResponse.data.fail ) {
            return;
          }

          //authKey가 있는 상태에서 가능
          const modifiedReviewId = axiosResponse.data.body.id;
          //alert(modifiedArticleId + "번 게시물 등록 완료!!");

          router.replace("/expert/list");
        });
      }

    return{
        modifiedReviewBodyElRef,
        modifiedRatingPointElRef,
        checkAndModifyReview,
        ratingPoint1,
        ratingPoint2,
        ratingPoint3,
        ratingPoint4,
        ratingPoint5,
        state,
        
    }
    

  }
  
})
</script>

<style scoped>

</style>