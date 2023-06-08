export const handleSelect = (selectedOption, id, setState) => {
    switch (id) {
      case 'month':
        setState((prevState) => ({ ...prevState, selectedMonth: selectedOption }));
        break;
      case 'day':
        setState((prevState) => ({ ...prevState, selectedDay: selectedOption }));
        break;
      case 'year':
        setState((prevState) => ({ ...prevState, selectedYear: selectedOption }));
        break;
      default:
        break;
    }
  };
  