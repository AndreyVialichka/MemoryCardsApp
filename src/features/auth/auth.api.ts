import { instance } from "common/api/common.api";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  forgorPassport: (arg:ArgForgotPassportType) => {
    return instance.post('auth/forgot',arg)
  },
  setNewPassport: (arg:ArgNewPassportType) => {
    return instance.post('auth/set-new-password',arg)
  },
  logout: () => {
    return instance.delete('/auth/me')
  },
  setUserNameAndAvatar: (arg:ArgNewNameAndAvatar) => {
    return instance.put('auth/me',arg)
  }
};

// Types
export type ArgLoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">

export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">
}

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
}


export type ArgForgotPassportType = {
  email: string,
  from? : string,
  message: string
}

export type ArgNewPassportType = {
  password:string,
  resetPasswordToken:string | undefined

}

export type ArgNewNameAndAvatar = {
  name?:string,
  avatar?: string,
}