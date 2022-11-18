  // helper functions for generating forms
  const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }) => {
    return (
    <form className="login" onSubmit={handleSubmit}>
        <div>
            <input 
              type="text"
              placeholder="username"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
        </div>
        <div>
            <input 
              type="password"
              placeholder="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">login</button>
      </form>
  )}

  export default LoginForm