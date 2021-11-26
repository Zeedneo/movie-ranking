import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TiArrowBackOutline } from "react-icons/ti";
import infoMovie from '../infoMovie/infoMovie.css'
import url from "../../url_file";

function InfoMovie(props) {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [click, setClick] = useState(0);

    const goBack = () => {
        if (props.state===0) {
            navigate(`../${props.search}`, { replace: false })
        }
        if (props.state===1) {
            navigate(`../favorites`, { replace: false })

        }    
    }

    useEffect(() => {
        axios.post(url+'getInfo', {
            movieID: props.ID
        })
            .then(function (response) {
                console.log(response.data);
                console.log(response.data.result);
                setData(response.data.result);
                props.totalOfPages(1);
            })
    }, [click])


    return (
        <div className="SpaceInfo">
            <div className="cardInfo mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={data.Poster} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="cardInfoBody-body">
                            <h2 className="cardInfoTitle-title">{data.Title}</h2>
                            <h5 className="cardInfoPlot-text">{data.Plot}</h5>
                            <p className="cardInfoMuted-text"><small className="text-muted">Type : {data.Type}</small></p>
                            <p className="cardInfoMuted-text"><small className="text-muted">Genre : {data.Genre}</small></p>
                            <p className="cardInfoMuted-text"><small className="text-muted">Runtime : {data.Runtime}</small></p>
                            <p className="cardInfoMuted-text"><small className="text-muted">Language : {data.Language}</small></p>
                            <p className="cardInfoMuted-text"><small className="text-muted">Actors : {data.Actors}</small></p>
                            <p className="cardInfoMuted-text"><small className="text-muted">Director : {data.Director}</small></p>
                            <p className="cardInfoMuted-text"><small className="text-muted">Writer : {data.Writer}</small></p>
                            <p className="cardLastInfo-text">
                                <small className="text-muted">Released: {data.Released}</small>
                                <button
                                type="button"
                                classname="buttonReturn"
                                id="buttonReturn"
                            onClick={() => {
                                goBack()
                            }}
                            > <TiArrowBackOutline /> </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoMovie;