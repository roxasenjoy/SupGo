import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from '../Marketplace.json';
import { useLocation } from "react-router";

export default function SellNFT () {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '', percent : 0, advantage : false});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();
    
    
    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }

    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const {name, description, price} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !description || !price || !fileURL)
            return;

        const nftJSON = {
            name, description, price, image: fileURL
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Ticket en cours de création...")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

            //massage the params to be sent to the create tickets request
            const price = ethers.utils.parseUnits(formParams.price, 'ether')
            const percent = formParams.percent;
            const advantage = formParams.advantage;

            let listingPrice = await contract.getListPrice()

            listingPrice = listingPrice.toString()


            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, price, percent, advantage,{ value: listingPrice })
            await transaction.wait()

            alert("SUCCES ! Ticket ajouté.");
            updateMessage("");
            updateFormParams({ name: '', description: '', price: '',percent : 0, advantage : false});
            window.location.replace("/")
        }
        catch(e) {
            console.log(e);
            alert( "Upload error"+e )
        }
    }

    function privileges()
    { 
        if(document.getElementById("percentage").style.display === 'none'){
        
            document.getElementById("percentage").style.display = "block";
        } else {
            
            document.getElementById("percentage").style.display = "none";
        }
    }
    return (
        <div className="">
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-10 " id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4 dark:bg-gray-800">
            <h3 className="text-center font-bold mb-8" style={{color:"#00C9B7"}}>Ajouter un ticket</h3>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name" style={{color:"#00C9B7"}}>Nom</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Ticket#XXXX" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="Description" style={{color:"#00C9B7"}}>Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" cols="40" rows="5" id="description" type="text" placeholder="Axie Infinity Collection" value={formParams.description} onChange={e => updateFormParams({...formParams, description: e.target.value})}></textarea>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="Prix" style={{color:"#00C9B7"}}>Prix (en ETH)</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div className="mb-7">
                    <input onClick={privileges} type="checkbox" id="card" name="card" value={formParams.advantage} onChange={e => updateFormParams({...formParams, advantage: e.target.value})}></input>
                    <label for="card" className="text-sm font-bold mb-2" style={{color:"#00C9B7"}}> Ajouter une carte avantage</label>
                </div>
                <div id="percentage" className="mb-8" style={{display: "none"}}>
                    <label className="block text-sm font-bold mb-2" htmlFor="price" style={{color:"#00C9B7"}}>% de réduction</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="10 / 25 / 50" step="0.01"  value={formParams.percent} onChange={e => updateFormParams({...formParams, percent: e.target.value})}></input>
                </div>
                <div>
                    <label className="block  text-sm font-bold mb-2" htmlFor="image" style={{color:"#00C9B7"}}>Upload votre image</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={listNFT} className="font-bold mt-10 w-full text-white rounded p-2 shadow-lg" style={{backgroundColor:"#00C9B7"}}>
                    Ajouter
                </button>
            </form>
        </div>
        </div>
    )
}