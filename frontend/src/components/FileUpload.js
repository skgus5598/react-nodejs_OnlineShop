import React, { useState } from 'react'
import Dropzone from "react-dropzone";
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


const FileUpload = (props) => {
    const [images, setImages] = useState([]);

    const dropHandler = (files) => {
        let newImages = [...files]
        console.log("newImages : " + JSON.stringify(newImages))
        setImages(newImages); // readURL
        props.imgset(newImages);

        /*multer
        let formdata = new FormData();
        const config = { header : {"Content-Type" : "multipart/form-data"}}
        files.forEach((e)=>{
            console.log("e : " + e)
            formdata.append("file", e)
        })
        //formdata.append("file", images[0])

        axios.post('http://localhost:5000/image', formdata, config)
             .then(response => {
                console.log("response : " + JSON.stringify(response))
                if(response.data.success){
                    setImages([...images, response.data.filePath])
                    props.imgset([...images, response.data.filePath])
                }else{
                    alert('failed')
                }
             })

        */
    }

    const deleteHandler = (image) => {
        const currentIndex = images.indexOf(image);
        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        setImages(newImages)
        props.imgset(newImages);
    }

    const imgPreview = images.map((image, i) => {
        return (
             <div onClick={() => deleteHandler(image)}  key={i}>
                <img src={URL.createObjectURL(image)} key={i} />
            </div>
        )
    })
    /*
            console.log("files ? " + JSON.stringify(files))
            let formData = new FormData();
            formData.append("files", files)
            axios.post('http://localhost:5000/imgFile',
                formData,
                {headers : {"Content-Type" : "multipart/form-data"}}
            )
            .then(res => {
                if(res.data.success){
                    //success
                    console.log("result : " + res.data )
                }else{
                    alert("failed")
                }
            })
    
        }
    */

    return (
        <>
            <div className="fileUploadDiv">
                <div className="uploadBox">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {/* <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}> */}
                        <Dropzone onDrop={dropHandler}>

                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div className='dropzonBox'
                                        style={{
                                            width: 250,
                                            height: 240,
                                            border: "1px solid lightgray",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius:"12px"
                                        }}
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        <PlusOutlined style={{ fontSize: '3rem' }} />
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                </div>
                <div className="previewBox">
                    {imgPreview}
                </div>
            </div>
        </>
    )
}
export default FileUpload;