import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { loginAsync, logOutAsync } from "../modules/login";

const LoginContainer = () => {
  const [value, setValue] = useState({
    phoneNum: "",
  });
  const { data, loading, error } = useSelector((state) => state.login.login);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const onChange = (e) => {
    e.preventDefault();
    let inputLeng = e.target.value.length;
    if(inputLeng > 8){
      setValue({
        ...value,
      });
    } else {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    let loginData = value;
    dispatch(loginAsync(loginData));
    setValue({
      phoneNum: "",
    });
  };

  const onLogout = (e) => {
    console.log(data);
    let { id } = data;
    let logoutData = {
      id,
    };
    console.log(logoutData);
    dispatch(logOutAsync(logoutData));
  };

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      <Login
        onSubmit={onSubmit}
        onChange={onChange}
        value={value}
      />
      {data && data.is_logined && <Logout onLogout={onLogout} login={data} />}
    </div>
  );
};

export default LoginContainer;
