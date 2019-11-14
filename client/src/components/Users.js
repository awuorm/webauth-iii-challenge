import React, { useEffect } from "react";
import axios from "axios";

const Users = props => {
  useEffect(() => {
    axios.get("http://localhost:4000/api/restricted/users")
    .then(res=> {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
  }, []);
  return <div></div>;
};

export default Users;
