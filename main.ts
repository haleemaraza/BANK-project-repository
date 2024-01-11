
import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
import chalk from "chalk";


// customer class
class Customer {
  firstName:string 
  lastName:string 
  age:number
  gender:string
  phone:number
  accNumber:number

  constructor(
    fName:string,
    lName:string,
    age:number,
    gender:string,
    phoneNumber:number,
    acc:number,
    ) {
    this.firstName = fName
    this.lastName = lName
    this.age = age
    this.gender = gender
    this.phone = phoneNumber
    this.accNumber = acc
  }
        
  }
  // interface bank account
interface BankAccount {
  accnumber : number,
  balance : number,
}
// class bank
class Bank {
  customer : Customer[] = []
  account :BankAccount[] = []

  addCustomer(obj:Customer){
    this.customer.push(obj)

  }

  addAccountNumber(obj:BankAccount){
    this.account.push(obj)
  }

  transcation(accobj: BankAccount ){
    let NewAccounts = this.account.filter(
      (acc) => acc.accnumber!==accobj.accnumber
      )
      this.account = [...NewAccounts,accobj]
  }
}

let HBL = new Bank ();

// customer create 
for(let i:number = 1; i <=3; i++ ){
  let fName = faker.person.firstName('male')
  let lName = faker.person.lastName()
  let num = parseInt(faker.phone.number());

  const cus = new Customer(fName,lName,25*i,"male",num,1000+i);
  HBL.addCustomer(cus)
  HBL.addAccountNumber({accnumber:cus.accNumber,balance:100*i})
}

// bank functionality 

async function bankService(bank:Bank) {
 do{
  let service = await inquirer.prompt({
    type:"list",
    name:"select",
    message:"please select the service",
    choices:["View Balance","Cash withdraw","Cash Desposit","Exit"]
  });

  // "View Balance"
  if (service.select =="View Balance" ){
    let res = await inquirer.prompt({
      type:"input",
      name:"num",
      message:"please enter your account number :"
    });
    let account = HBL.account.find((acc)=>acc.accnumber ==res.num)
    if(!account){
      console.log(chalk.red.bold("invalid account number"))
    }
    if (account){
        let name = HBL.customer.find((item)=>item.accNumber==account?.accnumber)
        console.log(
          `Dear ${chalk.green.italic(name?.firstName)} ${chalk.green.italic
            (
              name?.lastName
              )} you account balance is ${chalk.bold.blueBright(
                `$${account.balance}`
                )}`
                  )
    }
  }

  //"Cash withdraw"
  if (service.select == "Cash withdraw"){
    let res = await inquirer.prompt({
      type:"input",
      name:"num",
      message:"please enter your account number :"
    }); 
    let account = HBL.account.find((acc)=>acc.accnumber ==res.num)
    if(!account){
      console.log(chalk.red.bold("invalid account number"))
    }
    if (account){
      let ans = await inquirer.prompt({
        type:"number",
        name:"rupees",
        message:"please inter your amount .",
      });
      if(ans.rupees>account.balance){
        console.log(chalk.red.bold("current balance is not enough"))
      }
      let newbalance = account.balance-ans.rupees
      // transcation method call
      bank.transcation({accnumber:account.accnumber,balance:newbalance})
    }
  }

  // "Cash Desposit"
  if (service.select == "Cash Desposit"){
    if (service.select == "Cash Desposit"){
      let res = await inquirer.prompt({
        type:"input",
        name:"num",
        message:"please enter your account number :"
      }); 
      let account = HBL.account.find((acc)=>acc.accnumber ==res.num)
      if(!account){
        console.log(chalk.red.bold("invalid account number"))
      }
      if (account){
        let ans = await inquirer.prompt({
          type:"number",
          name:"rupees",
          message:"please inter your account .",
        });
        let newbalance = account.balance+ans.rupees
        // transcation method call
        bank.transcation({accnumber:account.accnumber,balance:newbalance})
      }
    }

  }
  if(service.select == "Exit")
  return;
 }
 while(true)
}
bankService(HBL)




