import { Link, useParams, useNavigate } from "react-router-dom";


function Pagination(props) {
    const PageNumbers = [];
    const { Page } = useParams();
    const navigate = useNavigate();


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

    return (
        <nav aria-label="Page navigation example">
            {
                props.disable
                    ? <ul class="pagination">
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

                            }>{Number}</Link></li>))}

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