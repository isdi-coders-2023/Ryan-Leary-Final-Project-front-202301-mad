import { SyntheticEvent, useMemo } from "react";
import { useUser } from "../../hooks/user/use.users";
import { UserStructure } from "../../models/user";
import { UserRepo } from "../../services/user/users.api.repo";
import "./register.scss";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
export default function Register() {
  const userRepo = useMemo(() => new UserRepo(), []);

  const { userRegister } = useUser(userRepo);
  const navigate = useNavigate();

  const handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = ev.currentTarget as HTMLFormElement;
    const inputs = formData.querySelectorAll("input");

    const userReg: UserStructure = {
      email: inputs[0].value,
      passwd: inputs[1].value,
      name: inputs[2].value,
      surname: inputs[3].value,
      role: "user",
    };
    const profilePic = (inputs[4] as unknown as HTMLFormElement).files?.item(0);
    userRegister(userReg, profilePic);
    formData.reset();
    navigate("/home");
    Swal.fire({
      position: "center",
      icon: "info",
      title: "User has been registered",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <span className="register-form">
        <h1 className="create-title">Register</h1>
        <form onSubmit={handleSubmit} className="form-inputs">
          <label htmlFor="email">
            <input type="email" placeholder="Email" required id="email" />
          </label>
          <label htmlFor="passwd">
            <input
              type="password"
              placeholder="Password"
              required
              id="passwd"
            />
          </label>
          <label htmlFor="name">
            <input type="text" placeholder="Name" required id="name" />
          </label>
          <label htmlFor="surname">
            <input type="text" placeholder="Surname" required id="surname" />
          </label>
          <label htmlFor="pfp">
            <input
              type="file"
              placeholder="Profile Picture"
              required
              id="pfp"
            />
          </label>
          <span>
            <button type="submit" className="register-button">
              Register
            </button>
          </span>
        </form>
      </span>
    </>
  );
}
