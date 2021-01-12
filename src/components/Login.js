import React from "react";

const Login = ({ value, onSubmit, onChange }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="phoneNum"
          onChange={onChange}
          value={value.phoneNum}
        ></input>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
