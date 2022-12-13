import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export default function NFTPage (props) {

const [data, updateData] = useState({});
const [dataFetched, updateDataFetched] = useState(false);
const [message, updateMessage] = useState("");
const [currAddress, updateCurrAddress] = useState("0x");
const [dataCard, updateDataCard] = useState([]);
const [dataFetchedCard, updateFetched] = useState(false);
const [address, updateAddress] = useState("0x");
const [totalPrice, updateTotalPrice] = useState("0");

async function getNFTData(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an tickets Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;

    let item = {
        price: meta.price,
        percent : listedToken.percent.toNumber(),
        // advantage : meta.advantage,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
    }
    updateData(item);
    updateDataFetched(true);
    updateCurrAddress(addr);
}

async function getNFTDataCard(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

    //create an tickets Token
    let transaction = await contract.GetMyAdvantages()

    /*
    * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
    * and creates an object of information that is to be displayed
    */
    
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            percent : i.percent.toNumber(),
            advantage : i.advantage,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        sumPrice += Number(price);
        return item;
    }))        

    updateDataCard(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
}

async function buyNFT(tokenId) {
    try {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
        
        setTimeout(await getNFTDataCard(tokenId),1000);
        let percent = 0
        let price = data.price
        dataCard.map((value, index) => {
            if(value.percent > 0 && data.advantage == false){
                if(value.percent >= percent){
                    percent = value.percent
                    let cal = 1 - value.percent/100;
                    price = data.price * cal
                }
            }
        })
        const salePrice = ethers.utils.parseUnits(price.toString(), 'ether')
        updateMessage("Achat du tickets en cours... (5min)")
        //run the executeSale function
        let transaction = await contract.executeSale(tokenId/*,percent.toString()*/, {value:salePrice});
        await transaction.wait();

        alert('Félicitation, vous venez d\'acheter un tickets');
        updateMessage("");
    }
    catch(e) {
        alert("Upload Error"+e)
    }
}

    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);
        getNFTDataCard(tokenId);

    return(
        <div style={{"min-height":"100vh"}} >
            <Navbar></Navbar>

            <div class="w-full bg-red max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 text-center pt-8 m-auto mt-7">
                <div class="text-3xl font-bold text-gray-900 dark:text-white text-center"> {data.name} </div>
                <br/>
                <div class="text-1xl text-gray-600 dark:text-white text-center"> {data.description} </div>
                <img src={data.image} alt="" className="p-8 rounded-t-lg" />

                <div class="px-5 pb-5">
                    <div class="flex items-center justify-between">
                        <span class="text-3xl font-bold text-gray-900 dark:text-white">{data.price + " ETH"}</span>
                        { currAddress === data.owner || currAddress === data.seller ?
                        <div className="enableEthereumButton text-white font-bold py-2 px-4 rounded text-sm" style={{backgroundColor:"#00C9B7"}}>Vous êtes le propriétaire </div>

                        : 
                        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Acheter </button>
                        }
                    </div>
                </div>

                <div class="text-white text-left px-5 pb-5">
                    <p> Propriétaire </p>
                    <div className="text-sm">{data.seller}</div>
                    </div>
                {/* <div class="text-white text-left px-5 pb-5">Vendeur : <div className="text-sm"></div></div> */}
                
            </div>
        </div>
    )
}
