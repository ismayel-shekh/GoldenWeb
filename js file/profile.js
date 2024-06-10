const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    fetch(`http://127.0.0.1:8000/user/list/${user_id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            const parent = document.getElementById("nagin-profile");
            const div = document.createElement("div");
            div.innerHTML =`
                            <h1 class="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white text-center">
                    Profile
                </h1>
                <h2 class="text-grey text-sm mb-4 dark:text-gray-400"></h2>
                <form>
                    <!-- Profile Image -->
                    <div class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('${data.image}')] bg-cover bg-center bg-no-repeat">
                        <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                            <input type="file" name="profile" id="upload_profile" hidden required>
                            <label for="upload_profile">
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
    const profile_image = document.getElementById("upload_profile").files[0];

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('mobile_number', mobile_number);

    if (profile_image) {
        formData.append('image', profile_image);
    }

    fetch(`http://127.0.0.1:8000/user/list/${user_id}/`, {
        method: 'PUT',
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
        alert('Profile updated successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while updating the profile');
    });
};

document.getElementById('nagin-profile').addEventListener('submit', updataprofile);