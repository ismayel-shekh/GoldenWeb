const getValue = (id) => {
    return document.getElementById(id).value;
};


const handldeposit = (event) => {
        event.preventDefault();
        const deposit = getValue("deposit-money")
        console.log(deposit)
        const dep = parseFloat(getValue("deposit-money")); 
        console.log(dep)
        const cus = localStorage.user_id.toString(); 
        console.log(cus)

        const token = localStorage.token;
        console.log(localStorage.user_id);
        console.log(token);
        const info ={
            "deposit": dep,
            "User": cus
        };
        console.log(info)
    
        if (dep > 0) {
            fetch("https://goldenweve-drf.onrender.com/deposit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(info),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data.message === "Deposit successful. Check email") {
                  Swal.fire({
                    title: "Payment Successful!",
                    text: `We’ve confirmed your ${dep}$ payment. please Chack your Email`,
                    icon: "success",
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "index.html";
                    }
                });
                  
                    
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                
            });
        } else {
            console.error('Deposit amount must be greater than 0');
            
        }
    };

    handldeposit();