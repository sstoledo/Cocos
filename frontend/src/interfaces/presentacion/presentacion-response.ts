export interface PresentacionResponse {
  id : string;
  name: string;
  createAt: Date;
  updateAt: Date;
  isActive: boolean;
}

export interface PresentacionResponseSelect {
  id: string;
  name: string;
}

export interface PresentacionByIdResponse {
  id: string;
  name: string;
}

export interface PresentacionAll {
  id: string;
  name: string;
}

export interface PresentacionFormInputs {
  name: string;
}

