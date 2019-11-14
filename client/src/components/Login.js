import React,{useState} from "react";
import axios from "axios";

const Login = (props) => {
    const [formValues, setFormValues] = useState({
        username: "",
        department:"",
        password:""

    });
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
      e.preventDefault();
      axios.post("http://localhost:4000/api/auth/login",formValues)
      .then(res => {
          console.log(res);
          props.history.push("/users");
         window.localStorage.setItem("token",res.data.token);
      })
      .catch(err => {
          console.log(err);
      })
  }
  console.log("form values", formValues);
  return (
    <div>
      <form>
        <input placeholder="username" name="username" onChange={handleChange} />
        <input
          placeholder="department"
          name="department"
          onChange={handleChange}
        />
        <input placeholder="password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit} >Submit</button>
      </form>
    </div>
  );
}

export default Login