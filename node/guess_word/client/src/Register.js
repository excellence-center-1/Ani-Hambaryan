
        } catch (err) {
            setSuccess(false);
            setErrMsg('Registration Failed');
        }
    };

    return (
        <div className="container w-25 mt-5 bg-danger-subtle p-4">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p>
            <h1>Register</h1>
            <form className="d-flex flex-column p-5 mt-5">
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input 
                        type="text" 
                        value={user} 
                        onChange={(e) => handleInputChange(e, 'user')} 
                        className="form-control" />
                    {!validName && user.length > 0 && (
                        <small id="nameHelp" className="form-text text-danger">
                            Username must start with a capital letter and be 3-16 characters long (alphanumeric, underscore, or hyphen).
                        </small>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        value={pwd}
                        onChange={(e) => handleInputChange(e, 'password')}
                        className="form-control"
                    />
                    {pwd.length > 0 && !validPwd && (
                        <small id="passwordHelp" className="form-text text-danger">
                            Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit.
                        </small>
                    )}

                </div>
                <div className="mb-3">

                    <button 
                        type="submit" 
                        onClick={handleSubmit} 
                        className="btn btn-primary">Register</button>
                </div>
            </form>
            <Link to="/login">Already have an account?</Link>

        </div>
    )
}
