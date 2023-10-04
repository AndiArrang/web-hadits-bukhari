import axios from "axios";
import React, { useState , useEffect, Fragment}  from "react"
import HomeComp from "../component/HomeComp";
import '../style/Home.css'


const Home = () => {
    const [data,setData] = useState([]);
    const username = 'webhadits';
    const password = 'arrangs3710';

    const basicAuth = 'Basic ' + btoa(`${username}:${password}`).toString('base64');
    const getData = () => {
        const number = Math.floor(Math.random() * (7008 - 1 + 1)) + 1;
        axios.get(`http://localhost:3001/hadits/${number}`,{
            headers: {
                'Authorization': basicAuth
            }
        })
        .then((response) => {
            // handle success
            console.log(response.data.data)
            setData(response.data.data[0])
        })
    }
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <Fragment> 

            <div className="quotes-text">
                Rasulullah صلى الله عليه و سلم bersabda: "Sampaikanlah dariku sekalipun hanya satu ayat"
            </div>
            
                {
                        <HomeComp data={data} />   
                }

            <button onClick={getData} class="btn btn-acak btn-success">Acak hadits</button>
        </Fragment>
    )
}

export default Home;