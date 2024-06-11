const handleLogin = (event) => {
  event.preventDefault();
  const email = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (email && password) {
      fetch("http://127.0.0.1:8000/user/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      })
      .then((res) => res.json())
      .then((data) => {
        
          if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
              console.log(data);
              fetch(`https://goldenweve-drf.onrender.com/user/list/${data.user_id}`)
              .then(res => res.json())
              .then(udata => {
                  console.log(udata);
                  if (udata.is_superuser) {
                      localStorage.setItem("usex", udata.id);
                      Swal.fire({
                          title: "Superuser Login",
                          text: "You have logged in as a superuser!",
                          icon: "info",
                      }).then((result) => {
                          if (result.isConfirmed) {
                              window.location.href = "index.html";  // Redirect to admin page if applicable
                          }
                      });
                  }
                  else if(udata.is_staff) {
                    localStorage.setItem("usex", udata.id);
                    Swal.fire({
                        title: "staff Login",
                        text: "You have logged in as a staff!",
                        icon: "info",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "index.html";  // Redirect to admin page if applicable
                        }
                    });
                }
                  else {
                      Swal.fire({
                          title: "Login Successful!",
                          text: "Welcome to ISBN BD!",
                          icon: "success",
                      }).then((result) => {
                          if (result.isConfirmed) {
                              window.location.href = "index.html";
                          }
                      });
                  }
              })
              .catch((error) => {
                  console.error("Error fetching user data:", error);
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Something went wrong fetching user data! Please try again later.',
                  });
              });
          } else {
              Swal.fire({
                  title: "Error",
                  text: "Username or password incorrect, please try again",
                  icon: "error",
              });
          }
      })
      .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong! Please try again later.',
          });
      });
  } else {
      Swal.fire({
          title: "Error",
          text: "Please enter both email and password",
          icon: "error",
      });
  }
};
