#!/bin/bash

npx sequelize-cli model:generate --name User --attributes username:string,password:string,roleId:number,firstName:string,lastName:string,phone:number,email:string,address:string,city:string,state:string,zipCode:number,emailList:boolean,emailVerified:boolean
npx sequelize-cli model:generate --name Role --attributes role:string
npx sequelize-cli model:generate --name Category --attributes name:string,description:string,status:boolean
npx sequelize-cli model:generate --name Cart --attributes userId:integer,products:array
npx sequelize-cli model:generate --name Visit --attributes count:integer
npx sequelize-cli model:generate --name Contact --attributes userId:integer,message:string,status:string,replied:boolean
npx sequelize-cli model:generate --name Coupon --attributes code:string,name:string,description:string,percentOff:integer
npx sequelize-cli model:generate --name Inventory --attributes quantity:integer
npx sequelize-cli model:generate --name Order --attributes userId:integer,products:array,total:integer,couponId:integer
npx sequelize-cli model:generate --name Product --attributes categoryId:integer,inventoryId:integer,name:string,description:string,price:integer,time:string,mother:string,father:string,profile:array,sex:string,image:string

npx sequelize-cli db:migrate