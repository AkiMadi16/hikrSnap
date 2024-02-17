import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteCard from './DeleteCard';
import Storage from "../handlers/storage";
import { useAuthContext } from "../context/AuthContext"
const { deleteFile } = Storage

function Cards({ path, title, createdAt, user, id }) {
  const navigate = useNavigate();
  const {currentUser } = useAuthContext();
  const handleOnClick = () => {
    console.log("card click");
    navigate(`/images/${id}`, { state : {id}})
  }

  const timeStamp = useMemo(() => {
    // const date = `${new Date(createdAt.seconds*1000)}`.split(" ")
    // return `${date[1]} ${date[2]}  ${date[3]}`
    return new Date(createdAt.seconds*1000).toLocaleDateString(navigator.language,{
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }, [])
   const handleDelete = async (deletedId) => {
    // Implement your logic to handle card deletion
    await deleteFile(path)
    console.log(`Card with ID ${deletedId} has been deleted`);
  };

  return (
    <div className="col mb-5" onClick={handleOnClick}>
      <div className="card" style={{ width: "18rem" }}>
        <div style={({
          height:"220px",
          backgroundImage: `url(${path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        })}></div>
   
        <h5 className='text-center mt-1'>{title}</h5>
        <div className='d-flex justify-content-between p-2'> 
          <p>{timeStamp}</p>
        <i>`@{user}`</i></div>
        {currentUser && 
        <DeleteCard id={id} onDelete={handleDelete} />}
      </div>
       {/* Render the DeleteCard component */}
     
    </div>
  );
}
export default Cards;
