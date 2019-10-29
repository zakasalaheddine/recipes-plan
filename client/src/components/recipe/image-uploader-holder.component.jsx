import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';



const ImageUploaderHolder = ({ images, handleDelete, addNewImage }) => {
    const handleChangeFile = (e) => {
        const data = new FormData() 
        data.append('file', e.target.files[0])
        axios.post("http://localhost:9000/upload", data, {
            onUploadProgress: ProgressEvent => {
            },
        })
        .then(res => {
            console.log(res);
            addNewImage('image', res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles)
    }
      
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    return (
        <Row>
            <Col>
                <label>Upload New Image</label>
                <div {...getRootProps()} className="dropzone mx-auto">
                    <input {...getInputProps()} accept="image/*" onChange={handleChangeFile}/>
                    {
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
            </Col>
            <Col>
                <Row>
                    {
                        images.lenght > 0 ? 
                            <p>AUCUNE IMAGES</p>
                        :   images.map((image, index) => (
                                <figure className="col-md-4 image-holder" key={index}>
                                    <Image src={image} alt="picture" rounded className="img-fluid shadow-sm" />
                                    <i className="fa fa-times text-danger" onClick={(e) => handleDelete(e, index, 'images')}></i>
                                </figure>
                            ))
                    }
                </Row>
            </Col>
        </Row>
        
    );
}
export default ImageUploaderHolder;