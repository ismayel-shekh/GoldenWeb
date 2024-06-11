const showPlans = () => {
    fetch(`https://goldenweve-drf.onrender.com/plan/add/`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data?.forEach((datax) => {
            console.log(datax);
            fetch(`https://goldenweve-drf.onrender.com/plan/addfeaters/?plan_id=${datax.id}`)
            .then((res) => res.json())
            .then((dataa) => {
                console.log(dataa);
                const parent = document.getElementById("detailinformation");
                const div = document.createElement("div");
                div.classList.add('mx-auto', 'flex', 'max-w-lg', 'space-y-8', 'items-start', 'flex-col', 'rounded-3xl', 'border', 'border-gray-200', 'bg-white', 'p-6', 'text-gray-900', 'xl:p-8');

                let featuresHTML = '';
                dataa.forEach((feature) => {
                    featuresHTML += `
                        <li class="flex items-center space-x-3">
                            <!-- Icon -->
                            <svg class="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span>${feature.featers}</span>
                        </li>`;
                });

                div.innerHTML = `
                    <h3 class="text-lg font-normal ">${datax.type}</h3>
                    <div class="my-8 flex items-baseline justify-center ">
                        <span class="mr-2 text-5xl font-extrabold">$${datax.cost}</span>
                        <span class="text-gray-600">/month</span>
                    </div>
                    <p class="font-light text-gray-600 sm:text-sm">Best option for personal training & for your Health</p>
                    <button class="cursor-pointer bg-gray-900 w-full rounded-md p-3 text-center text-sm font-semibold text-white shadow-sm hover:-translate-y-1" onclick="bookplans(${datax.id})" >Get started</button>
                    <!-- List -->
                    <ul role="list" class="mb-8 space-y-4 text-left text-gray-600 text-sm">
                        ${featuresHTML}
                    </ul>
                `;

                parent.appendChild(div);
            });
        });
    });
};

showPlans();


const bookplans = (plans) =>{
    console.log(localStorage.user_id)
    user_id = localStorage.user_id
    console.log(plans)
    const info = {
        "count": 1,
        "user": user_id,
        "Plan": plans
    }
    console.log("my user info", info);
    fetch("https://goldenweve-drf.onrender.com/plan/buy/", {
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
        else if (data.message === "plans  booking succesfully") {
          Swal.fire({
            title: " Successful!",
            text: `Booking successful `,
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

