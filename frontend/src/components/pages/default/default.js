import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RiHeartAddLine } from 'react-icons/ri';
import { ImInfo } from "react-icons/im";
import defaults from '../default/default.css';


function Default(props) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { searchURLword } = useParams();


    const searchFuntion = async (key) => {
        await axios.post('http://f5c2-2001-fb1-0-703d-8029-4526-d6e8-6764.ap.ngrok.io/search', {
            search: key, page: props.page, type: props.typeMovie
        })
            .then(function (response) {
                // console.log(response.data);
                setData(response.data.search);
                // console.log(response.data.totalPages);
                props.totalOfPages(response.data.totalPages);
            });
    }

    const AddToFav = async (value) => {
        await axios.post('http://f5c2-2001-fb1-0-703d-8029-4526-d6e8-6764.ap.ngrok.io/add2Favorite', {
            username: props.Username, movieID: value
        })
            .then(function (response) {
                // console.log(response.data.Response);
                // console.log(response.data.status);
            })
        // props.Fav_id(value);
    }

    useEffect(() => {
        // console.log("1")
        // console.log("key " + props.searchKey);
        if (props.searchKey != "") {
            searchFuntion(props.searchKey);
        }
        else {
            props.SearchKeyword(searchURLword);
            searchFuntion(searchURLword);
        }
    }, [props.searchKey , props.page , props.typeMovie]);


    return (
        <div className="container">
            <div className="row">
                {data
                    .map((val, key) => {
                        return (
                            <div class="card">
                                <div class="card-body">
                                    <img class="card-img-top" src={val.Poster} alt="..." />
                                    <h4 classname="card-title"> {val.Title}</h4>
                                    <br />
                                    <h6 classname="card-type"> Type {val.Type} </h6>
                                    <h6 classname="card-year"> Release Date {val.Year}</h6>
                                    <div>
                                        <button
                                            type="button"
                                            classname="card-buttonInfo"
                                            id="buttonInfo"
                                            // onClick={() => { AddToFav(val.imdbID) }}
                                        > <ImInfo /> </button>
                                        <button
                                            type="button"
                                            classname="card-buttonFav"
                                            id="buttonFav"
                                            onClick={() => { AddToFav(val.imdbID) }}
                                        > <RiHeartAddLine /> </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div >
    );
}

export default Default;