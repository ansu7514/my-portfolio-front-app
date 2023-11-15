const LoginForm = () => {
    return (
        <div className="login-form">
            <h2>LOGIN</h2>
            <div className="login-input-container">
                <div className="form-group form-group-with-icon">
                    <input id="login_id" type="text" name="id" className="form-control login-input" placeholder="ID" required data-error="ID is required." />
                </div>
                <div className="form-group form-group-with-icon">
                    <input id="login_pw" type="password" name="pw" className="form-control login-input" placeholder="Password" required data-error="Password is required." />
                </div>
            </div>
            <div className="header-buttons login-buttons">
                <button className="btn btn-primary login-btn">login</button>
                <button className="btn btn-primary login-btn">join</button>
            </div>
        </div>
    )
};

export default LoginForm;