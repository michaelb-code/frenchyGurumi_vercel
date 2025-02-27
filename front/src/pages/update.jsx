import { useParams } from "react-router-dom";

const Update = () => {
    const {id} = useParams();

    return(
        <div>
            <h1>Update Article {id}</h1>
        </div>
    )
}