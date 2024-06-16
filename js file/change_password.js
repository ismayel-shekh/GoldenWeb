const getValue = (id) => {
    return document.getElementById(id).value;
};


const Changepassword = (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("user_id")
    const old_password = getValue("old_password");
    const password = getValue("password");
    const password2 = getValue("confirm_password");
    const info = {
      user_id,
      old_password,
      password,
      password2
    };
    console.log(info)
    fetch(`https://goldenweve-drf.onrender.com/user/change_password/`, {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data );
            if (data.non_field_errors) {

                  Swal.fire({
                    title: " error!",
                    text: `provide currect password`,
                    icon: "error",
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "profile.html";
                    }
              });
                
                  
              }
              else if(data.message = 'Password changed successfully') {
                Swal.fire({
                    title: " Successful!",
                    text: `Successfully update password`,
                    icon: "success",
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "profile.html";
                    }
              });
                
                  
              }
              else{
                Swal.fire({
                    title: " error",
                    text: `something is wrong`,
                    icon: "error",
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "profile.html";
                    }
              });
              }

        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while updating the profile');
        });

   
  };
  
  