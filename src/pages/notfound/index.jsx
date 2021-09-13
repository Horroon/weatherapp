import NotFound from '../../assets/wp404error.jpg';

export const NotFoundImage = ({error:{isError}})=>
        isError ?
        <div className="notfound">
            <img src={NotFound} />
        </div> 
        : null