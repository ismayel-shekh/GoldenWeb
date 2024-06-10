const handlelogOut = () => {
    Swal.fire({
      title: "warning!",
      text: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out.",
          icon: "success",
          showConfirmButton: true // Show OK button
        }).then(() => {
          // Perform logout actions
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          window.location.href = "index.html"; // Redirect to login.html
        });
      }
    });
  };
  