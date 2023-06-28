document.addEventListener('DOMContentLoaded', function () {
    const food_container = document.querySelector(".food_container")
    fetch("food-data/food-data.json",
        {
            method: "get",
            redirect: "follow",
            referrerPolicy: "same-origin"
        })
        .then(response => response.json())
        .then(data => {
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    
                    const check_button = document.createElement("button")
                    const food_item = document.createElement("div")
                    const food_name = document.createElement("p")
                    const food_price = document.createElement("p")
                    const food_chef = document.createElement("p")
                    const food_description = document.createElement("p")
                    const food_location = document.createElement("p")
                    const food_image = document.createElement("img")
                    food_name.innerText = `Food: ${JSON.stringify(data[key].food).replace(/"/g, '').trim("")}`
                    food_price.innerText = `Price: ${JSON.stringify(data[key].price).replace(/"/g, '').trim("")}`
                    food_chef.innerText = `Chef: ${JSON.stringify(data[key].chef).replace(/"/g, '').trim("")}`
                    food_description.innerText = `Description: ${JSON.stringify(data[key].description)}`.replace(/"/g, '').trim("")
                    food_location.innerText = `Location: ${JSON.stringify(data[key].location).replace(/"/g, '').trim("")}`
                    food_image.src = (data[key].image)
                    food_image.alt = "food image"
                    food_item.className = "food_items"
                    check_button.innerText = "Place Order"
                    check_button.type="button"
                    check_button.style.backgroundColor = "green"
                    check_button.style.margin = "5px auto"
                    check_button.onclick = () => {
                        const proceed_order = document.createElement("div")
                        proceed_order.classList.add("payment")
                        proceed_order.innerHTML =
                        `
                        <div style="padding:50px; text-align:center;">
                            <h2 style="color:white; margin:10px;">Process food order</h2>
                            ${(food_item.lastChild.remove(), food_item.innerHTML)}
                        </div>
                        <form style=" border: 2px solid #fff; padding:10px; border-radius: 10px;">
                            <input type="text" placeholder="Bank NAme">
                            <input type="text" placeholder="enter credit card number">
                            <input type="text" placeholder="mm/yy">
                            <input type="text" placeholder="ccv">
                            <input type="submit" value="${"confirm payment"}">
                        </form>
                        `
                        // console.log(food_item.lastChild)
                        document.body.appendChild(proceed_order)
                    }
                    food_item.appendChild(food_image)
                    food_item.appendChild(food_name)
                    food_item.appendChild(food_price)
                    food_item.appendChild(food_chef)
                    food_item.appendChild(food_description)
                    food_item.appendChild(food_location)
                    food_item.appendChild(check_button)
                    food_container.appendChild(food_item)
                }
            }
        })


    const food_search = document.querySelector("input[type='search']")
    const food_section = document.querySelector(".food_list")
    const search_items = food_section.querySelector(".search_container")
    food_search.value = null
    food_search.oninput = () => { }
    document.querySelector("form").onsubmit = (event) => {
        event.preventDefault()
        const food_value = food_search.value.trim(" ").toLocaleLowerCase()
        fetch("food-data/food-data.json",
            {
                method: "get",
                redirect: "follow",
                referrerPolicy: "same-origin"
            })
            .then(response => response.json())
            .then(data => {
                if (food_value in data) {
                    // alert("Loading search result...")
                    const food_information = `
                        <div class="search_items">
                            <img src='${data[food_value].image} alt='${"food.jpg"}' loading='${"lazy"}' srcset="" />
                            <p>food: ${data[food_value].food}</p>
                            <p style="color:red;">price: N${data[food_value].price}</p>
                            <p>Chef: ${data[food_value].chef}</p>
                            <p>Description: ${data[food_value].description}</p>
                            <p>Location: ${data[food_value].location}</p>
                            <button type="button" onclick="${""}">${"Buy Now"}</button>
                        </div>`
                    search_items.innerHTML = food_information
                    food_section.style.display = "block"
                    const checkout = document.querySelector("button")
                    checkout.onclick = () => {
                        const proceed_order = document.createElement("div")
                        proceed_order.classList.add("payment")
                        proceed_order.innerHTML =
                            `<div>${(search_items.lastChild.lastChild.remove(), search_items.lastChild.innerHTML)}</div>
                        <form>
                            <input type="text" placeholder="Bank NAme">
                            <input type="text" placeholder="enter credit card number">
                            <input type="text" placeholder="mm/yy">
                            <input type="text" placeholder="ccv">
                            <input type="submit" value="${"confirm payment"}">
                        </form>
                        `
                        document.body.appendChild(proceed_order)
                    }

                } else {
                    alert(`Sorry we are not serving ${food_value} at the moment`)
                    food_section.style.display = null
                }
            }).catch(error => console.log(error))
        return false;
    }

})
