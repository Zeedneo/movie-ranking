import axios from "axios";
import { useEffect, useState } from "react";
import { BiBookHeart } from "react-icons/bi";
import { ImInfo } from "react-icons/im";
import { FaHeartBroken } from "react-icons/fa";
import favorites from "../favorites/favorites.css"


function Favorites(props) {
    const [type, setType] = useState("");
    const [data, setData] = useState([]);
    const [click, setClick] = useState(0);
    const [re, setRe] = useState(1);
    const [infoId, setInfoId] = useState("");
    const [nowId, setNowId] = useState(0);

    const removeFavorite = async (value) => {
        await axios.post('http://f5c2-2001-fb1-0-703d-8029-4526-d6e8-6764.ap.ngrok.io/removeFavorite', {
            username: props.Username, movieID: value
        })
            .then(function (response) {
                setRe(0);
                console.log(response.data.Response);
                console.log(response.data.status);
                console.log(response.data);
            })
    }

    const checkInfo = (Id) => {
        setInfoId(Id);
    }

    const checkshow = (Id) => {
        if (infoId === Id) {
            setNowId(1);
        }
    }

    useEffect(() => {
        axios.post('http://f5c2-2001-fb1-0-703d-8029-4526-d6e8-6764.ap.ngrok.io/showFavorite', {
            username: props.Username, type: type
        })
            .then(function (response) {
                // console.log("กด");
                // console.log(response.data.Response)
                // console.log(response.data.status)
                // console.log(response.data.username)
                // console.log(response.data.favorite)
                setData(response.data.favorite);
                console.log(response.data);
                props.totalOfPages(1);
            })
    }, [click , re , type]);


    return (
        <div className="container">
            <div className="myFavAndType">
                <h2 className="header title">My Favorites <BiBookHeart /></h2>
                <div className="header">
                    <div class="dropdown">
                        <button class="btn btn-fav dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Type
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#" onClick={() => setType("")}>all</a></li>
                            <li><a class="dropdown-item" href="#" onClick={() => setType("movie")}>movie</a></li>
                            <li><a class="dropdown-item" href="#" onClick={() => setType("series")}>series</a></li>
                            <li><a class="dropdown-item" href="#" onClick={() => setType("game")}>game</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                {data
                    .map((val, key) => {
                        return (
                            // {
                            //     nowId
                            //     ? <div></div>
                            //     :
                            // }
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
                                            classname="card-buttonUnFav"
                                            id="buttonUnFav"
                                            onClick={() => { removeFavorite(val.imdbID) }}
                                        > <FaHeartBroken /> </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default Favorites;