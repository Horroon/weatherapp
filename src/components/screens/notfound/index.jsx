import React, { memo } from 'react';
import NotFound from '../../../assets/wp404error.jpg';

export const NotFoundImage = memo(({error:{isError}})=>{
    return isError ?<div className="notfound">
            <img src={NotFound} />
        </div> : null
})