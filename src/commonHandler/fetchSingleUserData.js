import axios from "axios"
export const fetchIndividualUser = async (userID, userType, setError, setLoading, setUserData) => {
    axios
      .get('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=' + userType + '&?id=' + userID )
      .then(response => {
        const users = response.data
        const userData =  users.filter(user => user.id === userID)
        if(userData.length === 0){
          setError('User not found')
          setLoading(false)
        }
        else{
          setUserData(userData)
          setLoading(false)
        }
      })
      .catch(error => {
        setError(error);       
      })
  }