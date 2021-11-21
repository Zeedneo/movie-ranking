import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RiHeartAddLine } from 'react-icons/ri';
import defaults from '../default/default.css';


function Default(props) {
    const [data, setData] = useState([]);
    let { searchURLword } = useParams();
    const navigate = useNavigate();

    const searchFuntion = async (key) => {
        await axios.post('http://3c2b-2001-fb1-0-703d-508-57c7-d135-65a1.ap.ngrok.io/search', { "search": key })
            .then(function (response) {
                console.log(response.data.search);
                // console.log(response.data.totalPages);
                setData(response.data.search);
            });
    }

    const AddToFav = async (value) => {
        await axios.post('http://3c2b-2001-fb1-0-703d-508-57c7-d135-65a1.ap.ngrok.io/add2Favorite', {
            username: props.Username, movieID: value
        })
            .then(function (response) {
                console.log(response.data.Response);
                console.log(response.data.status);
            })
        // props.Fav_id(value);
    }


    useEffect(() => {
        console.log("key " + props.searchKey);
        if (props.searchKey != "") {
            searchFuntion(props.searchKey);
        }
        else {
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
                            <h7 classname="card-type"> Type {val.Type} </h7>
                            <br />
                            <h7 classname="card-year"> Release Date {val.Year}</h7>
                            <button
                                type="button"
                                classname="card-buttonFav"
                                id="buttonFav"
                                onClick={() => { AddToFav(val.imdbID) }}
                            // onClick={console.log("กดใจ")}
                            > <RiHeartAddLine /> </button>
                        </div>
                    </div>
                })}
        </div>
    );
}

export default Default;