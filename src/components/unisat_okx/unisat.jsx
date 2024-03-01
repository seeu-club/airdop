import UnisatImg from "../../assets/unisat.png";
import {useEffect, useRef, useState} from "react";
import store from "../../store";
import {saveAccount, saveType} from "../../store/reducer.js";

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
    }, []);


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
    };

    const disconnect = () =>{
        store.dispatch(saveAccount(null));
        store.dispatch(saveType(null));
    }

    return <li onClick={()=>connect()} className={disable?"op":""}>
        <img src={UnisatImg} alt=""/>
        <div className="rht">
            Unisat
        </div>
    </li>
}
