const getValue = (id) => {
    return document.getElementById(id).value;
};

const handleRegistration = (event) => {
    event.preventDefault();
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const mobile_number = getValue("mobile-number");
    const password = getValue("password");
    const confirm_password = getValue("c_password");
    const info = {
      email,
      first_name,
      last_name,
      mobile_number,
      password,
      confirm_password,
    };
    console.log(info)

    if (password === confirm_password) {
      document.getElementById("error").innerText = "";
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
      ) {
        console.log(info);
          fetch("http://127.0.0.1:8000/user/register/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log( "line 37", data);
            if (data.success){
              Swal.fire({
                title: "Success!",
                text: `Dear ${info.first_name} ${info.last_name}, please go to your email ${info.email} inbox and click on the received activation link to confirm and complete the registration. Note: Check your spam folder.`,
                icon: "success",
              })
              .then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "login.html";
                }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email or username Already exists ! Please try again !',
          });
          }
          });

      } else {
        document.getElementById("error").innerText =
          "password must contain eight characters, at least one letter, one number and one special character:";
      }
    } else {
      document.getElementById("error").innerText =
        "password and confirm password do not match";
    }
  };
  