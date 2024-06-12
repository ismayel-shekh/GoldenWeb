function getValue(id) {
    return document.getElementById(id).value;

}

function addproduct(event) {
    event.preventDefault();

    const image = document.getElementById("image").files[0]; // Get the file object
    const brand = getValue("brand");
    const product = getValue("product");
    const price = getValue("price");
    console.log(image)

    const formData = new FormData(); // Create FormData object
    formData.append("image", image); // Append the image file
    formData.append("brand", brand);
    formData.append("name", product);
    formData.append("price", price);
   
    fetch("https://goldenweve-drf.onrender.com/product/product/", {
        method: "POST",
        body: formData, // Pass FormData object as body
    })
    .then((res) => res.json())
    .then(data => {
        console.log(data);
        console.log(data);
        if (data) {
          Swal.fire({
            title: " Successful!",
            text: `Successfuly add a product`,
            icon: "success",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "index.html";
            }
        });
          
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
