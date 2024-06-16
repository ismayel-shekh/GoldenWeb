const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    fetch(`https://goldenweve-drf.onrender.com/user/list/${user_id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            const parent = document.getElementById("nagin-profile");
            const div = document.createElement("div");
            div.innerHTML = `
                            <h1 class="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white text-center">
                    Profile
                </h1>
                <h2 class="text-grey text-sm mb-4 dark:text-gray-400"></h2>
                <form>
                    <!-- Profile Image -->
                    <div class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('${data.image}')] bg-cover bg-center bg-no-repeat">
                        <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                            <input type="file" name="profile" id="" hidden required>
                            <label for="">
                                <svg data-slot="icon" class="w-6 h-5 text-blue-700" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                                </svg>
                            </label>
                        </div>
                    </div>
                    <h2 class="text-center mt-1 font-semibold dark:text-gray-300">Upload Profile Image</h2>
                    <h2 class="text-center mt-1 font-semibold dark:text-gray-300">Balance: ${data.balance} $</h2>
                                        <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div class="w-full mb-4 mt-6">
                            <label for="upload-image" class="mb-2 dark:text-gray-300">Upload Image</label>
                            <input id="upload-image" type="file" class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="image" value="${data.image}">
                        </div>
                        </div>
                    <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div class="w-full mb-4 mt-6">
                            <label for="first-name" class="mb-2 dark:text-gray-300">First Name</label>
                            <input id="first-name" type="text" class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="First Name" value="${data.first_name}">
                        </div>
                        <div class="w-full mb-4 mt-6">
                            <label for="last-name" class="mb-2 dark:text-gray-300">Last Name</label>
                            <input id="last-name" type="text" class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="Last Name" value="${data.last_name}">
                        </div>
                    </div>
                    <div class="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div class="w-full mb-4 mt-6">
                            <label for="email" class="mb-2 dark:text-gray-300">Email</label>
                            <input id="email" type="text" class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="email" value="${data.email}">
                        </div>
                        <div class="w-full mb-4 mt-6">
                            <label for="phone-number" class="mb-2 dark:text-gray-300">Phone Number</label>
                            <input id="phone-number" type="number" class="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" placeholder="phone" value="${data.mobile_number}">
                        </div>
                    </div>
                    


                    <div class="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                        <button type="submit" class="w-full p-4" onclick="updataprofile(event)">Update</button>
                    </div>
                </form>
            `;
            parent.appendChild(div);
        });
};
loadUserDetails();




const getValue = (id) => {
    return document.getElementById(id).value;
};

const updataprofile = (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");
    const first_name = getValue("first-name");
    const last_name = getValue("last-name");
    const email = getValue("email");
    const mobile_number = getValue("phone-number");
    const profile_image = document.getElementById("upload-image").files[0];
    console.log(user_id)
    console.log(first_name)
    console.log(last_name)
    console.log(email)
    console.log(mobile_number)
    console.log(profile_image)
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('mobile_number', mobile_number);
    // formData.append('image', profile_image);

    if (profile_image) {
        formData.append('image', profile_image);
    }

    fetch(`https://goldenweve-drf.onrender.com/user/list/${user_id}/`, {
        method: 'PATCH',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            if (data) {

                Swal.fire({
                  title: "Success!",
                  text: `Successfully update profile`,
                  icon: "success",
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

document.getElementById('nagin-profile').addEventListener('submit', updataprofile);



const showplans = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);

    fetch(`https://goldenweve-drf.onrender.com/plan/buy/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const seenPlans = new Set(); // Initialize a Set to track seen plans

            data?.forEach((datax) => {
                if (!seenPlans.has(datax.Plan)) { // Check if the Plan has not been seen before
                    seenPlans.add(datax.Plan); // Add the Plan to the Set

                    fetch(`https://goldenweve-drf.onrender.com/plan/add/${datax.Plan}`)
                        .then((res) => res.json())
                        .then((dataa) => {
                            console.log(dataa);
                            console.log(data)
                            const parent = document.getElementById("myallplans");
                            const div = document.createElement("div");
                            div.innerHTML = `
                            <a href="pricing.html"
        class="flex flex-col p-6 space-y-6 transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-8 lg:flex-row lg:space-y-0 lg:space-x-6">
        <div
            class="flex items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner lg:h-20 lg:w-20">
            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                </path>
            </svg>
        </div>
        <div class="flex-1">
            <h5 class="mb-3 text-xl font-bold lg:text-2xl">${dataa.type} Plans</h5>
            <p class="mb-6 text-lg text-gray-600">Price: ${dataa.cost}$</p>
            <span class="flex items-baseline text-lg font-bold text-indigo-600">
              View  comparison
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
        </div>
    </a>
                            `;
                            parent.appendChild(div);

                        })
                        .catch((error) => console.error('Error:', error));
                }
            });
        })
        .catch((error) => console.error('Error:', error));
};

showplans();


const showproduct = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);

    fetch(`https://goldenweve-drf.onrender.com/product/buy/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((datax) => {
        datax?.forEach((dataa) => {
            console.log(dataa)
    fetch(`https://goldenweve-drf.onrender.com/product/product/${dataa.product}`)
    .then((res) => res.json())
    .then((item) => {
        console.log(item)

            const parent = document.getElementById("productinformation");
            const div = document.createElement("div");
            div.classList.add('w-72', 'bg-white', 'shadow-md', 'rounded-xl', 'duration-500', 'hover:scale-105', 'hover:shadow-xl')
            div.innerHTML=`
                    <a ">
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
                    
                </div>
            </div>
        </a>
            `;
            parent.appendChild(div);
        })

    })




        })


}
showproduct();