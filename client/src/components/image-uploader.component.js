import React from 'react';
import { Col } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ handleChangeFile }) => {
    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles)
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <Col>
            <label>Upload New Image</label>
            <div {...getRootProps()} className="dropzone mx-auto">
                <input {...getInputProps()} name="image" accept="image/*" onChange={handleChangeFile}/>
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </Col>
    )
}
export default ImageUploader;