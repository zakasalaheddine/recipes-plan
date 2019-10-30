import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import axios from 'axios';


import ImageUploader from '../image-uploader.component';

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
    return (
        <Row>
            <ImageUploader handleChangeFile={handleChangeFile} />
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