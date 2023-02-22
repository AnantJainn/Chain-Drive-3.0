// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css"

// const FileUpload = ({ contract, account, provider }) => {
//     const [file, setFile] = useState(null)
//     const [fileName, setFileName] = useState("No Image Selected")
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (file) {
//             try {
//                 const formData = new FormData();
//                 formData.append("file", file);

//                 const resFile = await axios({
//                     method: "post",
//                     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//                     data: formData,
//                     headers: {
//                         pinata_api_key: `bb2808f463db59b06d27`,
//                         pinata_secret_api_key: `319fcdddc5c4d3fda2526f67cdc83fb6e55a1084004d080f03f4a4e9d6ca66d1`,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
//                 const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//                 // const signer = contract.connect(provider.getSigner());
//                 contract.add(account, ImgHash);
//                 alert("Successfully Image Uploaded");
//                 setFileName("No Image Selected");
//                 setFileName(null)
//             } catch (e) {
//                 alert("Unable to upload image to Pinata")
//             }
//         }
//     }
//     const retrieveFile = (e) => {
//         const data = e.target.files[0]; // files array of files object
//         // console.log(data);
//         const reader = new window.FileReader();
//         reader.readAsArrayBuffer(data);
//         reader.onloadend=()=>{
//             setFile(e.target.files[0]);
//         }
//         setFileName(e.target.files[0].name);
//         e.preventDefault();
//     }
//     return (
//         <div className="top">
//             <form className="form" onSubmit={handleSubmit}>
//                 <label htmlFor="file-upload" className="choose">
//                     Choose Image
//                 </label>
//                 <input
//                     disabled={!account}
//                     type="file"
//                     id="file-upload"
//                     name="data"
//                     onChange={retrieveFile}
//                 ></input>
//                 <span className="textArea">Image: {fileName}</span>
//                 <button type="submit" className="upload" disabled={!file}>
//                     Upload File
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default FileUpload;

// // This is a React component named "FileUpload" that allows users to upload an image file to IPFS (InterPlanetary File System) and add the resulting image hash to a smart contract on the blockchain. The component uses the following dependencies: useState hook from React and axios for making HTTP requests.

// // The component has a state that holds the selected image file and its name. The handleSubmit function is called when the user submits the form, and it checks if a file has been selected. If a file is selected, it creates a new FormData object and appends the selected file to it. Then it makes a post request to Pinata's API to upload the file to IPFS using the Pinata API key and secret API key as headers. If the request is successful, the image hash is retrieved from the response, prefixed with "ipfs://", and added to the smart contract using the add function. A success alert is shown to the user, and the file input is cleared.

// // The retrieveFile function is called when the user selects a file, and it retrieves the selected file from the event and sets the file state with it.

// // The component returns a form with an input element of type "file" that allows users to select an image file, a button that allows users to submit the form and upload the file to IPFS, and a span element that shows the name of the selected file. The button is disabled if no file has been selected or if the user is not signed in to the web3 wallet. The form is styled with CSS classes.

/*This File consist of file uploading functionality as its name suggests 
i will be using pinata for pinning my IPFS files and to interact with pinata
we need axios {Axios is a library that serves to create HTTP requests that are present externally.}*/

import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ account, provider, contract }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("Please Select a Image");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `
                        0ac64773fc431404bacd`,
                        pinata_secret_api_key: `2002881594cb41c4bed45f4d272a811e39f83535e02392e10b6d052df596c820`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                // const signer = contract.connect(provider.getSigner());
                contract.add(account, ImgHash); //contract function
                alert("Hogaya Bhai");
                setFileName("Please Select Image");
                setFile(null);
            } catch (error) {
                console.log(error);
                alert("Unable To Upload iamge.");
            }
        }
    };
    const retrieveFile = (e) => {
        const data = e.target.files[0]; // as user can upload multiple images at a time i always want image feom 0th index
        //console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    return (
        <>
            <div className="top">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="file-upload" className="choose">
                        Choose Image
                    </label>
                    <input
                        disabled={!account}
                        type="file"
                        id="file-upload"
                        name="data"
                        onChange={retrieveFile}
                    ></input>
                    <span className="textArea">Image: {fileName}</span>
                    <button type="submit" className="upload" disabled={!file}>
                        Upload File
                    </button>
                </form>
            </div>
        </>
    );
};
export default FileUpload;