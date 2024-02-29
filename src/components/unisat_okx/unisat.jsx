import OkxImg from "../../assets/okx.png";
import UnisatImg from "../../assets/unisat.png";
import {useEffect, useRef, useState} from "react";

export default function Unisat(){

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
        getUnisatNet();
    }, []);

    const getUnisatNet = async() =>{
        try {
            let res = await unisat.getNetwork();
            console.log(res)
        } catch (e) {
            console.log("network",e);
        }
    }

    const connect = async() =>{
        if(disable)return;
        const result = await unisat.requestAccounts();
        self.accounts = result;

        if (result.length > 0) {
            // store.dispatch(saveAccount(result[0]));
            console.log(result[0])

        }

    }

    const handleAccountsChanged = () => {

        disconnect()
        // self.accounts = _accounts;
        // if (_accounts.length > 0) {
        //     store.dispatch(saveAccount(_accounts[0]));
        // }
    };

    const disconnect = () =>{
        // store.dispatch(saveAccount(null));
    }

    return <li onClick={()=>connect()} className={disable?"op":""}>
        <img src={UnisatImg} alt=""/>
        <div className="rht">
            Unisat
        </div>
    </li>
}
