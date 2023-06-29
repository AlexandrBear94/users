import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';


// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [isSuccess, setSuccess] = React.useState(false);



  const selectUsers = (id) => {
    if (selectedUsers.includes(id)) {
      const addUsers = selectedUsers.filter(i => id !== i)
      setSelectedUsers(addUsers);
    } else {
      setSelectedUsers(prevArr => [...prevArr, id])
    }
  }


  // if (focusButton.includes(index)) {
  //  setFocusButton(focusButton.filter(num => index !== num));
  //} else {
  //  setFocusButton(prev => [...prev, index])
  //  console.log(focusButton);
  //}


  React.useEffect(() => {

    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      }).catch(err => {
        console.warn(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => setLoading(false));
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }


  return (
    <div className="App">
      {isSuccess ? (<Success count={selectedUsers.length} />) :
        (<Users
          onClickSuccess={setSuccess}
          selectedUsers={selectedUsers}
          selectUsers={selectUsers}
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading} />
        )
      }

    </div>
  );
}

export default App;
