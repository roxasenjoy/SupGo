import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

function NFTTile (data) {
    
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    }
    return (
        <Link to={newTo} className="card">
            <div class="bg-white border border-gray-200 rounded-lg shadow-md m-5 mb-5 h-full bg-gray-800 p-1 pb-5 ">
                <img src={data.data.image} alt="" className="rounded-t-lg" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white text-white">{data.data.name}</h5>

                    <p class="mb-3 font-normal text-white">{data.data.description}</p>
                    
                </div>
                
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-sky-700 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" style={{backgroundColor:"#00C9B7"}}>
                        Envie de voyager ? 
                </a>
            </div>
        </Link>
    )
}

export default NFTTile;
