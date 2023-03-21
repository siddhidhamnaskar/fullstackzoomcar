import { json, Link } from "react-router-dom";
import "./styles.css";
import { useRef ,useState} from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    // const [usersData,setData]=useState([]);

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const emailWarningRef = useRef(null);
    const nameWarningRef = useRef(null);
    const passwordSizeWarningRef = useRef(null);
    const confirmPasswordWarningRef = useRef(null);

    const navigate = useNavigate();

    let hideWarning = () => {
        emailWarningRef.current.style.display = "none";
    }

    let hideNameWarning = () => {
        nameWarningRef.current.style.display = "none";
    }

    let hidePasswordSizeWarning = () => {
        passwordSizeWarningRef.current.style.display = "none";
    }


    let hideConfirmPasswordWarning = () => {
        confirmPasswordWarningRef.current.style.display = "none";
    }

    function validate(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    let signUp = () => {

        console.log("sign up");

      

        if (nameRef.current.value.length < 4) {
            nameWarningRef.current.style.display = "block";
           
        }

        if (passwordRef.current.value.length < 8) {
            passwordSizeWarningRef.current.style.display = "block";
           
        }

        if (confirmPasswordRef.current.value !== passwordRef.current.value) {
            confirmPasswordWarningRef.current.style.display = "block";
          
            console.log("confirm warning");
        }
        

        else {
            const data={ "name": nameRef.current.value, "email": emailRef.current.value, "password": passwordRef.current.value };
            fetch('/signup',{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
     
            })
            .then((res)=>{
                console.log(res.json());
                alert("Account Created Successfully !");
                navigate("/login");
             
            })
            .catch((err)=>{
                alert("Register Failed");
            })

        }


      
    }

    return <div>

        <img id="backgroundImage" src="https://www.zoomcar.com/build/fb65fcc43b8bededb813e093ea2d47d3.svg" />

        <div id="containsAllDiv">

            <div id="divNextToImageDiv">

                <h3 id="enterDetailsH3Tag">Enter details to Sign Up</h3>

                <div id="menuDiv">

                    <input type="email" ref={emailRef} onClick={hideWarning} required id="emailInputTag" className="menuInputItems" placeholder="Enter your email" />
                    <p ref={emailWarningRef} className="warningPTag" >This email is already registered !</p>
                    <input ref={nameRef} onClick={hideNameWarning} required className="menuInputItems" placeholder="Enter your name" />
                    <p ref={nameWarningRef} className="warningPTag"  >Name must contain at least 4 characters</p>
                    <input ref={passwordRef} onClick={hidePasswordSizeWarning} required type="password" minLength="8" className="menuInputItems" placeholder="Enter your password" />
                    <p ref={passwordSizeWarningRef} className="warningPTag" >Password must be atleast of 8 characters !</p>
                    <input ref={confirmPasswordRef} onClick={hideConfirmPasswordWarning} required type="password" minLength="8" className="menuInputItems" placeholder="Confirm your password" />
                    <p ref={confirmPasswordWarningRef} className="warningPTag"  >Passwords don't match !</p>

                    <button onClick={signUp} id="logInButton">Sign Up</button>

                    <Link style={{ "text-decoration": "none" }} to="/login"><p id="createNewAccountPTag">Already have an account?</p></Link>

                </div>

            </div>

        </div>

    </div>

}

export default SignUp;