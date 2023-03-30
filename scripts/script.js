'use strict'

// inputs
const title = document.querySelector('.title')
const description = document.querySelector('.description')
const date = document.querySelector('.date')
const btn = document.querySelector('.btn')

//outlet
const outlet = document.querySelector('.outlet')


// Fetch data
const data_from_storage = localStorage.getItem('data')
const usable_data = JSON.parse(data_from_storage)

console.log(usable_data)
usable_data.forEach(element => {
     outlet.innerHTML += `
            <div class="task">
                <p>${element.title}</p>
                <p>${element.description}</p>
                <p>${element.date}</p>
                <div>
                    <button>Mark Done</button>
                    <button class="del">DELETE</button>
                </div>
            </div>
         `
});

btn.addEventListener('click', function (e) {
    e.preventDefault()
    if (!title.value || !description.value || !date.value) {
        alert('Inputs cannot be empty!!')
        // return false;
    } else {
        const data_container = []

        const data = {
            id: '',
            title: title.value,
            description: description.value,
            date: date.value
        }
        if (usable_data) {
            data_container.push(...usable_data, data)
            const stringified_data = JSON.stringify(data_container)
            localStorage.setItem('data', stringified_data)

        }
        data_container.push(data)
        const stringified_data = JSON.stringify(data_container)
        localStorage.setItem('data', stringified_data)
        console.log(usable_data)

        


       
    }


})

const del = document.querySelectorAll('.del')
del.forEach(del_btn=>{

    console.log(del)
})