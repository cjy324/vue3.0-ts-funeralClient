//axios 설치해야 함 
//npm i axios
//npm i @types/axios 도 설치해야함 
//axios: ajax통신을 받아오는 것
//@types/axios: typescript에서 axios를 다루는데 도움이 되는 정보들
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {IArticle, IMember} from '../types'

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected _handleRequest(config:AxiosRequestConfig) : AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  };

  // POST전송으로 전송하기 위한 로직
  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();

    for ( let key in data ) {
      params.append(key, data[key]);
    }

    config =  {} as AxiosRequestConfig;

    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };

    return this.instance.post(url, params, config);
  }

}

// 응답타입1
interface Base__IResponseBodyType1 {
  resultCode:string;
  msg:string;
}

// /usr/article/list 의 응답 타입
export interface MainApi__article_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    articles: IArticle[]
  };
}

// /usr/article/detail 의 응답 타입
export interface MainApi__article_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    article: IArticle
  };
}

// /usr/article/doAdd 의 응답 타입
export interface MainApi__article_doWrite__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}


// /usr/member/list 의 응답 타입
export interface MainApi__member_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    members: IMember[]
  };
}

// http://localhost:8024/usr/ 와의 통신장치
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://localhost:8090/usr/',
      })
    );
  }

  protected _handleRequest(config:AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    return config;
  };

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    if ( axiosResponse?.data?.requestCode == "F-B" ) {
      alert('로그인 후 이용해주세요.');
      location.replace('/member/login');
    }

    return axiosResponse;
  }

  // http://localhost:8021/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public article_list(boardId: number) {
    return this.instance.get<MainApi__article_list__IResponseBody>(`/article/list?boardId=${boardId}`);
  }

  // http://localhost:8021/usr/detail/id?id=? 를 요청하고 응답을 받아오는 함수
  public article_detail(id: number) {
    return this.instance.get<MainApi__article_detail__IResponseBody>(`/article/detail?id=${id}`);
  }

  // http://localhost:8024/usr/article/doAdd/boardId=?&title=?&body=? 를 요청하고 응답을 받아오는 함수
  // postByForm: post 전송을 스프링이 이해할 수 있는 form형식으로 전송시켜주는 함수?
  public article_doWrite(boardId:number, title: string, body: string) {
    return this.postByForm<MainApi__article_doWrite__IResponseBody>(
      `/article/doAdd`, {
        boardId,
        title,
        body
      }
    );
  }


  // http://localhost:8021/usr/article/list?boardId=? 를 요청하고 응답을 받아오는 함수
  public member_list(boardId: number, searchKeywordType:string, searchKeyword:string, page:number) {
    return this.instance.get<MainApi__member_list__IResponseBody>(`/member/list?boardId=${boardId}&searchKeywordType=${searchKeywordType}&searchKeyword=${searchKeyword}&page=${page}`);
  }

  

} 

