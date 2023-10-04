import axios from "axios"
import React, { useState , useEffect, Fragment}  from "react"
import LoadingSpinner from "../component/LoadingSpinner";
import KitabComp from '../component/KitabComp';
// import Menu from "../component/Navbar";
const KitabList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData] = useState([])
    
    const username = 'webhadits';
    const password = 'arrangs3710';

    const basicAuth = 'Basic ' + btoa(`${username}:${password}`).toString('base64');
    const getApi = () => {
        setIsLoading(true)
        axios.get('http://localhost:3001/kitab',{
            headers: {
              Authorization: basicAuth
            }
          })
        .then((response) => {
            // handle success
            console.log(response.data)
            setData(response.data.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <Fragment>       
            <h1 className="header-kitab-list">Daftar Kitab</h1>
            { isLoading ? <LoadingSpinner /> : '' }
                {    
                    data.map((item,i) => { 
                        return (       
                            <KitabComp key={i} kitab={item.nama} hadits={item.jumlah} no={i+1} />
                        )
                    })
                }      
        </Fragment>
    )
}

export default KitabList;