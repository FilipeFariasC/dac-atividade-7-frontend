import FormGroup from "../components/FormGroup";
import Navbar from "../components/Navbar";
import {useState} from "react"
import UserModel from "../model/UserModel";

interface LoginProps{
    setUserLogged: (user: UserModel)=> void;
}
function submitCredentials(username: string, password: string){
    return username === "monteiro@ifpb.edu.br" && password === "123"
}

export default function LoginPage(props : LoginProps){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")


    return (
        <>
        <header>
            <Navbar/>
        </header>
        <main className="form-center">
            <h2>Login</h2>
            <form action=""
            onSubmit={ (event)=>{
                    event.preventDefault();
                    if(submitCredentials(username, password)){
                        props.setUserLogged({
                            username,
                            password
                        })
                    }
                }
            }
            >
                <FormGroup label="Nome de Usuário" forModel={"username"}>
                    <input className="form-control" type="text" id="username"
                    value={username}
                    onChange={(event)=>{setUsername(event.target.value)}}
                    />
                </FormGroup>
                <FormGroup label="Senha" forModel={"password"}>
                    <input className="form-control" type="password" id="password"
                    value={password}
                    onChange={(event)=>{setPassword(event.target.value)}}
                    />
                </FormGroup>

                <hr />
                
                <button className="btn btn-primary submit-btn" type="submit" >
                    Login
                </button>
            </form>
        </main>
        </>
    );
}
