export interface UserType {
  uuid: string,
  name: string,
  username: string,
  role: number[],
  special_privledges: string[]
}

export enum STATE {
  SUCESS,   // authentication success
  WRONGCRED,  // wrong credentials

  VALIDATIONERROR,
  USERTAKEN,
}