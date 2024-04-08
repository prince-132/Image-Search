import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsePhotos = () => {
    const [photos, setPhotos] = useState([]);

    

    return (
        <div>
            <div className='photos-container'>
                {photos.map(photo => (
                    <img key={photo.id} src={photo.urls.regular} alt={photo.alt_description} />
                ))}
            </div>
        </div>
    );
};

export default UsePhotos;
