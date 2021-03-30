<template>

  <TitleBar>후기/평점 작성 페이지</TitleBar>

  <section class="section section-review-write-form-box px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <form v-if="globalShare.isLogined" v-on:submit.prevent="checkAndAddReview">
          <div title="평점" class="text-center h-24">
            <div class="btn-success">평점</div>
            <select ref="newRatingPointElRef" class="text-xl h-10 mt-2 w-1/2 border">
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
            </select>
          </div>
          <div class="btn-success">후기 작성</div>
          <FormRow>
            <textarea ref="newReviewBodyElRef" class="form-row-input border" placeholder="내용을 입력해주세요."></textarea>
          </FormRow>
          <FormRow >
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
import * as Util from '../utils'


export default defineComponent({
  name: 'ReviewAddPage',

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
    }
  },

  setup(props){
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;

    const newReviewBodyElRef = ref<HTMLInputElement>();
    const newRatingPointElRef = ref<HTMLInputElement>();


    /* 공백 체크 */
    function checkAndAddReview(){

      //일반적으로 안해도 되지만 typescript에서는 해야됨
      //제목
      if(newReviewBodyElRef.value == null){
        return;
      }

      const newReviewBodyEl = newReviewBodyElRef.value;
      newReviewBodyEl.value = newReviewBodyEl.value.trim();

      if(newReviewBodyEl.value.length == 0){
        alert('내용을 입력해 주세요.')
        newReviewBodyEl.focus();
        return;
      }

    
    const raingAdd = (onSuccess:Function) => {

        mainApi.rating_doAdd(props.relTypeCode, props.relId, Util.toIntOrNull(newRatingPointElRef.value?.value), props.globalShare.loginedClient.id)
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


      const startAddReview = () =>{
      // 작성 함수로 보내기
          addReview(props.relTypeCode, props.relId, newReviewBodyEl.value, props.globalShare.loginedClient.id);
      }

      raingAdd(startAddReview);
    }

    //typescript에서는 title:string, body:string 이런식으로 type을 적어주어야 한다
      function addReview(relTypeCode:string, relId:number, body:string, clientId:number){
       
        mainApi.review_doAdd(relTypeCode, relId, body, clientId)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          
          // 로그인이 fail 상태이면 리턴
          if ( axiosResponse.data.fail ) {
            return;
          }

          //authKey가 있는 상태에서 가능
          const newReviewId = axiosResponse.data.body.id;
          //alert(newArticleId + "번 게시물 등록 완료!!");

          router.replace("/expert/list");
        });
      }

    return{
        newReviewBodyElRef,
        newRatingPointElRef,
        checkAndAddReview,
        
    }

  }
  
})
</script>

<style scoped>

</style>