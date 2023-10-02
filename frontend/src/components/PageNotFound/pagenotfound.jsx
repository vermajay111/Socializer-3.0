import { Link } from "react-router-dom"

function PageNotFound(){

    return <>
    <h1>It looks like you are lost 😢 please click here to get back on track: <Link to="/">Go Home</Link></h1>
    </>
}

export default PageNotFound