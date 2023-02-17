import Axios from "axios";
import { useContext, useEffect } from "react";
import { Store } from "react-notifications-component";
import domain from "../../util/domain";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

interface SigninProps {
  setLabel: Function;
  email: string;
  password: string;
}

export default function Signin(props: SigninProps) {
  let navigate = useNavigate();
  const { getUser } = useContext(UserContext);

  const { email, password, setLabel } = props;
  useEffect(() => {
    const signIn = async () => {
      try {
        await Axios.post(domain + "user/signin", {
          email,
          password,
        });
        setLabel("Success!");

        await getUser();

        navigate("../");
      } catch (err: any) {
        Store.removeAllNotifications();
        Store.addNotification({
          title: "Error",
          message: err.response.data.clientError,
          type: "danger",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
          insert: "top",
        });
        setLabel("Error!");
        setTimeout(() => setLabel("Sign In"), 1500);
      }
    };
    signIn();
  }, [email, password, setLabel]);
  return null;
}
