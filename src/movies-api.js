
export async function login(username, password){
    const loginData = {
        username: username,
        password: password,
    };
    let response = await fetch("https://iecm-movies-app-6966360ed90e.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })

    return await response.json()
}

export async function signupUser(username, email, password){
    const signupData = {
      username: username,
      email: email,
      password: password,
    };
    let response = await fetch("https://iecm-movies-app-6966360ed90e.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })

    return await response.json()
}