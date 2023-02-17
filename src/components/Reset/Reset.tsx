import Axios from "axios";
import { useContext, useEffect } from "react";
import { Store } from "react-notifications-component";
import domain from "../../util/domain";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

interface ResetProps {
  setLabel: Function;
  email: string;
}

export default function Reset(props: ResetProps) {
  const { getUser } = useContext(UserContext);

  const { email, setLabel } = props;
  useEffect(() => {
    // reset();
  }, [email, setLabel]);
  return null;
}
