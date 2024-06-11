const showproduct = () => {
    fetch(`https://goldenweve-drf.onrender.com/product/product/`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        data?.forEach((item) =>{
            const parent = document.getElementById("productinformation");
            const div = document.createElement("div");
            div.classList.add('w-72', 'bg-white', 'shadow-md', 'rounded-xl', 'duration-500', 'hover:scale-105', 'hover:shadow-xl')
            div.innerHTML=`
                    <a href="#" onclick="buyproduct(${item.id})">
            <img src="${item.image}"
                    alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
            <div class="px-4 py-3 w-72">
                <span class="text-gray-400 mr-3 uppercase text-xs">${item.brand}</span>
                <p class="text-lg font-bold text-black truncate block capitalize">${item.name}</p>
                <div class="flex items-center">
                    <p class="text-lg font-semibold text-black cursor-auto my-3">$${item.price}</p>
                    <del>
                        <p class="text-sm text-gray-600 cursor-auto ml-2">$50</p>
                    </del>
                    <div class="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg></div>
                </div>
            </div>
        </a>
            `;
            parent.appendChild(div);
        })

    })
}
showproduct();

const buyproduct = (product) =>{
    console.log(localStorage.user_id)
    user_id = localStorage.user_id
    console.log(product)
    const info = {
        "quantiry": 1,
        "user": user_id,
        "product": product
    }
    console.log("my user info", info);
    fetch("https://goldenweve-drf.onrender.com/product/buy/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(info),
      })
      .then((res) => res.json())
      .then((data) =>{
        console.log(data)
        if (data.error === "Insufficient balance") {
          Swal.fire({
            title: "Insufficient balance",
            text: `Please deposited amount`,
            icon: "error",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "deposit.html";
            }
        });
          
            
        }
        else if (data.error === "Not Available ") {
          Swal.fire({
            title: "Sorry!",
            text: `Not Available `,
            icon: "error",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "index.html";
            }
        });
          
            
        }
        else if (data.message === "Buying successful") {
          Swal.fire({
            title: " Successful!",
            text: `Buying successful `,
            icon: "success",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "index.html";
            }
        });
          
            
        }

        else{
          Swal.fire({
            title: "error",
            text: `something is wrong`,
            icon: "error",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "index.html";
            }
        });
          
            
        }
      })
}