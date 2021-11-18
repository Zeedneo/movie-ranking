import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Default(props) {
    const [data, setData] = useState([]);
    let { searchURLword } = useParams();
    const navigate = useNavigate();

    const searchFuntion = async (key) => {
         await axios.post('http://05ba-2001-fb1-1-5392-3509-e6e4-83a4-ca4b.ap.ngrok.io/search', { "search": key })
            .then(function (response) {
                // console.log(response.data.search);
                // console.log(response.data.totalPages);
                setData(response.data.search);
            });
    }


    useEffect(() => {
        console.log("key "+props.searchKey);
        if (props.searchKey !=""){
            searchFuntion(props.searchKey);
        }
        else{
            props.SearchKeyword(searchURLword);
            searchFuntion(searchURLword);
        }
    }, [props.searchKey]);

    return (
        <div className="container">
            {data
                .map((val, key) => {
                    return <div class="card" style={{ width: "16rem" }}>
                        <div class="card-body">
                            <img class="card-img-top" src={val.Poster} alt="..." />
                            <h5 classname="card-title"> {val.Title}</h5>
                            <h6 classname="card-year">Type {val.Type} , Release Date {val.Year}</h6>
                        </div>
                    </div>
                })}
        </div>
    );
}

export default Default;