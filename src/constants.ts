export const DB_NAME: string = 'chat'


export const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const AvailableUserRoles: string[] = Object.values(UserRolesEnum);


export enum ChatEventEnum {
  CONNECTED_EVENT= "connected",
  DISCONNECT_EVENT= "disconnect",
  JOIN_CHAT_EVENT= "joinChat",
  LEAVE_CHAT_EVENT= "leaveChat",// FOR GROUP
  UPDATE_GROUP_NAME_EVENT= "updateGroupName",// FOR GROUP
  MESSAGE_RECEIVED_EVENT= "messageReceived",
  NEW_CHAT_EVENT= "newChat",
  SOCKET_ERROR_EVENT= "socketError",
  STOP_TYPING_EVENT= "stopTyping",
  TYPING_EVENT= "typing"
} 




export const cookieOptions = {
  domain:'localhost',
  path:'/',
  httpOnly: true,
  secure: false, // Adjust this based on your environment (e.g., use `true` in production with HTTPS)
};

export enum UserType {
  ADMIN= "admin",
  USER= "user",
};

export const AvailableUserType = Object.values(UserType);

export enum UserLoginType {
  GOOGLE= "GOOGLE",
  GITHUB= "GITHUB",
  EMAIL_PASSWORD= "EMAIL_PASSWORD",
};

export const AvailableSocialLogins = Object.values(UserLoginType);

export enum StatusType {
  ACTIVE= "active",
  UNACTIVE = "unActive",
  BLOCK= "block"
};

export const AvailableStatusType = Object.values(StatusType);

export enum OrderStatus {
  REQUEST= "request",
  ACCEPT= "accept",
  DECLINE= "decline",
  PURCHASED= "purchased",
  RETURNED= "returned"
}

export const AvailableOrderStatus = Object.values(OrderStatus);

export enum OrderType {
  IN_PERSON= "inPerson",
  DELIVERY= "delivery"
}

export const AvailableOrderType = Object.values(OrderType);

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'],
};


