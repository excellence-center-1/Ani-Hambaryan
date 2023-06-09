

export const handleInput = (e, setState) => {
    const { id, value } = e.target;
  
    switch (id) {
      case 'firstName':
        setState((prevState) => ({ ...prevState, firstName: value }));
        break;
      case 'lastName':
        setState((prevState) => ({ ...prevState, lastName: value }));
        break;
      case 'email':
        setState((prevState) => ({ ...prevState, email: value }));
        break;
      case 'password':
        setState((prevState) => ({ ...prevState, password: value }));
        break;
      default:
        break;
    }
  };
  