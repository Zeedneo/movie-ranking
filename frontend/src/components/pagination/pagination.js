import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import pagination from "../pagination/pagination.css"


function Pagination(props) {
    const PageNumbers = [];
    const { Page } = useParams();
    const navigate = useNavigate();
    // const [br, setBr] = useState(0);


    for (let i = 1; i <= props.totalPages; i++) {
        PageNumbers.push(i);
    }

    const previousPage = () => {
        if (props.currentPage !== 1) {
            props.page(props.currentPage - 1);
        }
    }

    const nextPage = () => {
        if (props.currentPage !== props.totalPages) {
            props.page(props.currentPage + 1);
        }
    }

    // const Br = (number) => {
    //     if (number/10===0) {
    //         setBr(1);
    //     }
    //     else {
    //         setBr(0);
    //     }
    // }

    return (
        <nav aria-label="Page navigation example">
            {
                props.disable
                    ? <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <Link class="page-link" to="/" aria-label="Previous" onClick={previousPage}>
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>

                        {PageNumbers.map(Number => (
                            <li class="page-item"><Link class="page-link" to="/" onClick={() => {
                                props.page(Number);
                                navigate(`../num`);
                                console.log("กด");
                            }

                            }>{Number}</Link></li>
                            // {
                            //     Br(number)
                            // }
                        ))}

                        <li class="page-item">
                            <Link class="page-link" to="/" aria-label="Next" onClick={nextPage}>
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                            <div></div>
                        </li>
                    </ul>
                    : <div></div>
            }
        </nav>
    );
}

export default Pagination;