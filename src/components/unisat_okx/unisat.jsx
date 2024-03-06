import {useEffect, useRef, useState} from "react";
import store from "../../store";
import {getClaimNum, saveAccount, saveShowSign, saveType} from "../../store/reducer.js";

import UnisatImg from "../../assets/unisat.png";

export default function Unisat({handleClose}){

    const [disable,setdisable] = useState(false);
    const {unisat} = window;
    const selfRef = useRef ({
        accounts: [],
    });
    const self = selfRef.current;

    useEffect(() => {
        const checkUnisat = async () => {
            if (!unisat) {
                setdisable(true)
                return;
            }
            setdisable(false)
            unisat.on("accountsChanged", handleAccountsChanged);
            return () => {
                unisat.removeListener("accountsChanged", handleAccountsChanged);
            };
        }
        checkUnisat().then();
        // getUnisatNet();
    }, []);

    // const getUnisatNet = async() =>{
    //     try {
    //         let res = await unisat.getNetwork();
    //         console.log(res)
    //     } catch (e) {
    //         console.log("network",e);
    //     }
    // }

    const connect = async() =>{
        if(disable)return;
        const result = await unisat.requestAccounts();
        self.accounts = result;

        if (result.length > 0) {
            store.dispatch(saveAccount(result[0]));
            store.dispatch(saveType("Unisat"));
        }
        handleClose()
    }

    const handleAccountsChanged = () => {

        disconnect()
        // self.accounts = _accounts;
        // if (_accounts.length > 0) {
        //     store.dispatch(saveAccount(_accounts[0]));
        // }
    };

    const disconnect = () =>{
        store.dispatch(saveAccount(null));
        store.dispatch(saveType(null));
        store.dispatch(saveShowSign(null));
    }

    return <li onClick={() => connect()} className={disable ? "op" : ""}>
        <img src={UnisatImg} alt=""/>
        <div className="rht">
            Unisat
        </div>
    </li>
}
