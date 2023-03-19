import React from 'react'
import {useRouter} from "next/router";

const Profile = () =>{
    const {
        query : {idLibro, idAutor}
    } = useRouter();

    return <div> Hola RECIBI {idLibro} y TAMBIÉN  {idAutor} </div>
}

export default Profile;