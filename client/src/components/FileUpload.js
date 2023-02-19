import { useState } from "react";
import axios from "axios";
import "./FileUpload.css"

const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("No Image Selected")
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `74b8e6b6f89ad9517f25`,
                        pinata_secret_api_key: `10ad1c1fa631d48f067023bf7e79b00145743e3b2922c9bbb454b21a5a4f3ae`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                // const signer = contract.connect(provider.getSigner());
                await contract.add(account, ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No Image Selected");
                setFileName(null)
            } catch (e) {
                    alert("Unable to upload image to Pinata")
                }
            }
    }
        const retrieveFile = () => {
        }
        return <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                    Choose Image
                </label>
                <input disabled={!account} type="file" name="data" onChange={retrieveFile} />
                <span className="textArea">Image:#anant.png</span>
                <button type="submit" className="upload">Upload File</button>
            </form>
        </div>
    };

    export default FileUpload;