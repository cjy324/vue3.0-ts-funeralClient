//중복되는 것 
export interface IEntity {
  id:number;
  regDate:string;
  updateDate:string;
}


export interface IOrder extends IEntity {
	head:number;
	religion:string;
	startDate:string;
	endDate:string;
	title:string;
  funeralHome:string;
	body:string;
	expertId:number;
	clientId:number;
  stepLevel:number;
  extra__clientName:string;
  extra__expertName:string;
}

export interface IClient extends IEntity {
  loginId:string;
  loginPw:string;
  authKey:string;
  name:string;
  cellphoneNo:string;
  email:string;
  region:string;
  extra__thumbImg:string;
  
}

export interface IExpert extends IEntity {
  loginId:string;
  loginPw:string;
  authKey:string;
  acknowledgment_step:string;
  name:string;
  cellphoneNo:string;
  email:string;
  region:string;
  license:string;
  career:string;
  extra__thumbImg:string;
  extra__ratingPoint:number;
}

export interface IAssistant extends IEntity {
  loginId:string;
  loginPw:string;
  authKey:string;
  name:string;
  cellphoneNo:string;
  email:string;
  region:string;
  career:string;
  extra__thumbImg:string;
  extra__ratingPoint:number;
  
}

export interface IReview extends IEntity{
  relId:number;
  relTypeCode:string;
  body:string;
  clientId:number;
}
