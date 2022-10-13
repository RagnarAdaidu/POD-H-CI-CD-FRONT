import { useState,useEffect } from "react";
//import "./dashboard.css";
import Tab from "./Tab";
// import Navbar from "../NavBar/NavBar";
// import TransactionHistory from "../transaction-history/TransactionHistory";
import Bankform from "./Bankform/Bankform";
import { IoArrowBackSharp } from "react-icons/io5";
import { bankFormState } from "../../atoms/bankFormAtom";
import { useRecoilState } from "recoil";
import { HeadingStyle } from "./ViewAccts/Viewacctstyle";
import {getUser} from '../../api/auth'

// import Navbar from "../NavBar/NavBar";
import Withdraw from "./WithdrawBalance/Withdraw"
import WithdrawalHistory from "../../history/WithdrawalHistory";
import SellAirtimeForm from "./SellAirtimeForm/SellAirtimeForm";

import NewTransactionHistory from "../../history/NewTransactionHistory";
function Dashboard() {
  const [user,setUser] =useState("")
  useEffect(() =>{
    const loadUser = async ()=> {
      const record =await getUser()
      setUser(record.record)
     
    }
    loadUser()
  },[])
  console.log(user)
  const [formState, setFormState] = useRecoilState(bankFormState);
  const menu = [
    "Transfer",
    "Withdraw Balance",
    "Manage Bank Account",
    "Withdrawals",
    "Transactions"
  ];
 
// console.log(user.wallet)
  const [active, setActive] = useState(menu[0]);

  return (
    <div className="App">
      {/* <Navbar/> */}
      <div className="rectangle2">
       
       
        <div className="frame1">
          {active === menu[0] || active === menu[1] ? (
            <>
              <h1 className="mydash">Dashboard</h1>
              <div className="money">
                <h5 className="walletBalance">Wallet balance</h5>
                <h1 className="fig">{user.wallet}</h1>
                <h5 className="account">Account is active</h5>
              </div>
            </>
          ) : active === menu[2] && !formState ? (
            <HeadingStyle>
              <IoArrowBackSharp
                size="1.5rem"
                onClick={() => setFormState(true)}
              />
              <h1 className="mywith">Manage Account</h1>
            </HeadingStyle>
          ) : (
            <h1>{active}</h1>
          )}
          <div className="ul">
            <div className="na">
              {menu.map((item, index) => (
                <div className="mock" onClick={() => setActive(item)} >{item}</div>
              ))}
            </div>
            <div className="outlet">
              {active === menu[0] ? (
                <SellAirtimeForm/>
              ) : active === menu[1] ? (
                <Withdraw/>
              ) : active === menu[2] ? (
                <Bankform />
              ) : (
                 active === menu[3]?(
                  <WithdrawalHistory/>
              ):(
                <NewTransactionHistory/>
              )
           ) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
