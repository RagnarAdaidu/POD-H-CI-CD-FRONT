import React, { useState } from "react";
import { SellAirtimeFormStyle, CustomStyle,Label, ModalPopupStyle} from "./SellAirtimeFormStyle";
import Select from "react-select";
import { networkProvidersOptions } from "../../../utils/networkproviders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../utils/Input/Input";
import { postSellAirtime } from "../../../api/auth";
import {CopyToClipboard} from 'react-copy-to-clipboard';


const SellAirtimeForm = ({ ...props }) => {


  
  const [networkName, setNetwork] = useState({});
  const [network,setNetworkName] = useState('')
  const [phoneNumber, setphoneNumber] = useState('');
  const [airtimeAmount, setamountToSell] = useState('');
  const [ussd, setussd] = useState('');
  const [destinationPhoneNumber, setdestinationPhoneNumber]=useState('');
  const [amountToReceive,setamountToReceive]=useState('')
  const [modal, setModal] = useState(false);
  
  const sellAirtime = async (network, phoneNumber,airtimeAmount,ussd,destinationPhoneNumber) => {
    try {
      // eslint-disable-next-line no-useless-escape
   
        if ( network === "" || phoneNumber === ""||airtimeAmount===""||ussd===""||destinationPhoneNumber==="") {
        return toast.error("No field should be left empty, please fill all fields");
      } 

      postSellAirtime({network, phoneNumber,airtimeAmount,destinationPhoneNumber});
      toast.success("Airtime successfully sold")
      

        
  } catch (error) {
      toast.error(error);
    }
  };
  
const handleChange = (selectedOption) => {
  setNetwork(selectedOption.value);
  networkProvidersOptions.forEach(el=>{
    if (selectedOption.value.name === el.label ) {
      setNetworkName(el.label);
      setussd(el.value.ussd);
      setdestinationPhoneNumber(el.value.number);
     
    }
  })
}


async function copyTextToClipboard(e) {
  e.preventDefault();
  navigator.clipboard.writeText(ussd); 
}

async function copyTextToClipboard1(e) {
  e.preventDefault();
  navigator.clipboard.writeText(destinationPhoneNumber); 
}

const handleChange2 = (e) => {
  let ussdArrray = ussd.split("*");
  ussdArrray[ussdArrray.length-2]=e.target.value;
  let ussdString = ussdArrray.join("*");
  setussd(ussdString);
  setamountToSell(e.target.value);
  setamountToReceive(`NGN ${parseInt(e.target.value*0.7)}`);
  
  
}



  const handleSubmit = (e) => {
    e.preventDefault();
    sellAirtime(network, phoneNumber,airtimeAmount,ussd,destinationPhoneNumber);
    if(network && phoneNumber && airtimeAmount && ussd && destinationPhoneNumber){
     toggleModal(e);
    }
  };
  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };
  
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  
  return (

    <SellAirtimeFormStyle>
        <form action="" className="sellairtimeform">
        {modal && (
          <ModalPopupStyle>
         <div className="modal">
         <div onClick={toggleModal} className="overlay"></div>
         <div className="modal-content">
          
           <h5>
           Admin has been notified
           Your wallet would be credited soon
           </h5>
           <button className="close-modal" onClick={toggleModal}>
             CLOSE
           </button>
         </div>
       </div>
        </ModalPopupStyle>
        )}
        <div className="sellAirtime-header">
        <h1 className="sel">Transfer Airtime</h1>
        
      </div>
          <label htmlFor="">Network</label>
          <Select
            className="selections"
            styles={CustomStyle}
            onChange={handleChange}
            options={networkProvidersOptions}
            placeholder="Select Network"
            name="network"
            //value={networkName}
          />
          <Label>
                <InputField
                  type="input"
                  className="input"
                  label="Phone Number"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  change={(e) => setphoneNumber(e.target.value)}
                  value={phoneNumber}
                />


              <InputField
                  type="input"
                  className="input"
                  label="Amount to Sell"
                  placeholder="NGN"
                  name="airtimeAmount"
                  change={handleChange2}
                  value={airtimeAmount}
                />

              <InputField
                  type="input"
                  className="input"
                  label="USSD"
                  placeholder="*780*amount*09088756433*5000#"
                  name="ussd"
                 // change={(e) => setussd(e.target.value)}
                  value={ussd}
                  readOnly
                /><button onClick={copyTextToClipboard} id="btnCopy"><span>Copy USSD to clipboard</span></button>

          

                <InputField
                  type="input"
                  className="input"
                  label="Amount to Receive"
                  placeholder="NGN"
                  name="amountToReceive"
                  //change={(e) => setamountToReceive(e.target.value)}
                  //value={calcReceive}
                  value={amountToReceive}
                  readOnly
                />          

                <InputField
                  type="input"
                  className="input"
                  label="Destination Phone Number"
                  placeholder="Destination Phone Number"
                  name="destinationPhoneNumber"
                 // change={(e) => setdestinationPhoneNumber(e.target.value)}
                  value={destinationPhoneNumber}
                  readOnly
              
                  /> 
                <p className="clkdecs">After transferring the airtime, click on the "Send” button below</p>
                </Label>  

          <button type="submit" className="btnnn" onClick={handleSubmit}>
            Sent, Notify Admin
          </button>
        </form>
      

        <ToastContainer />
    </SellAirtimeFormStyle>
  );
};
export default SellAirtimeForm;
