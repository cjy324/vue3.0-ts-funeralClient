//중복되는 것 
export interface IEntity {
  id:number;
  regDate:string;
  updateDate:string;
}


export interface IOrder extends IEntity {
  option1:string;
	option1qty:number;
	option2:string;
	option2qty:number;
	option3:string;
	option3qty:number;
	option4:string;
	option4qty:number;
	option5:string;
	option5qty:number;
	title:string;
  funeralHome:string;
	body:string;
	directorId:number;
	clientId:number;
  stepLevel:number;
  extra__member:string;
}

export interface IMember extends IEntity {
  loginId:string;
  loginPw:string;
  authLevel:number;
  authKey:string;
  name:string;
  nickname:string;
  cellphoneNo:string;
  email:string;
  address:string;
  extra__thumbImg:string;
  extra__ratingPoint:number;
}

export interface IReview extends IEntity{
  relId:number;
  relTypeCode:string;
  body:string;
  memberId:number;
}
