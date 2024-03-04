import {useEffect, useRef, useState} from "react";
import store from "../../store";
import {saveAccount, saveShowSign, saveType} from "../../store/reducer";

import OkxImg from "../../assets/okx.png";

export default function Okx({handleClose}){


    const [disable,setdisable] = useState(false);

    const {okxwallet} = window;

    const selfRef = useRef ({
        accounts: [],
    });
    const self = selfRef.current;

    useEffect(() => {
        const checkUnisat = async () => {
            if (!okxwallet) {
                setdisable(true)
                return;
            }
            setdisable(false)
            okxwallet.on("accountsChanged", handleAccountsChanged);
            return () => {
                okxwallet.removeListener("accountsChanged", handleAccountsChanged);
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
        const result = await okxwallet.bitcoin.connect();
        self.accounts = result.address;
        if (result.address) {
            store.dispatch(saveAccount(result.address));
            store.dispatch(saveType("OKX"));
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

    return <li onClick={() => connect()}>
        <img src={OkxImg} alt=""/>
        <div className="rht">
            OKX
        </div>
    </li>
}
