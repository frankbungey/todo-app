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

function fetch_data() {
    if (usable_data) {
        usable_data.forEach(function (element) {
            function checkStatus(){
                if(element.done){
                    return "Completed"
                }else{
                    return "Mark Done"
                }
            }
            
           const status = checkStatus()

            outlet.innerHTML += `
                    <div class="task ${element.done}" id="${element.id}">
                        <p >${element.title}</p>
                        <p>${element.description}</p>
                        <p>${element.date}</p>
                        <div>
                            <button class="mrkdone">${status}</button>
                            <button class="del">DELETE</button>
                        </div>
                    </div>
                 `
        });
      
    }
}

fetch_data()

btn.addEventListener('click', e => {
    e.preventDefault()
    if (!title.value || !description.value || !date.value) {
        alert('Inputs cannot be empty!!')
        // return false;
    } else {
        const data_container = []
        const id = Date.now()
        const data = {

            id: id,
            title: title.value,
            description: description.value,
            date: date.value,
            done: false
        }
        if (usable_data) {
            data_container.push(...usable_data, data)
            const stringified_data = JSON.stringify(data_container)
            localStorage.setItem('data', stringified_data)
            window.location.reload()


        } else {
            data_container.push(data)
            const stringified_data = JSON.stringify(data_container)
            localStorage.setItem('data', stringified_data)
            console.log(usable_data)
            window.location.reload()

        }

    }
})

const del = document.querySelectorAll('.del')

del.forEach(del_btn => {
    del_btn.addEventListener('click', () => {
        const del_id = del_btn.parentElement.parentElement.id

        console.log(usable_data)
        const updated_data = usable_data.filter(data => data.id != del_id)
        localStorage.setItem('data', JSON.stringify(updated_data))
        window.location.reload()
    })

})


const mark_done = document.querySelectorAll('.mrkdone')
// console.log(mark_done)
mark_done.forEach((btn) => {

    btn.addEventListener('click', () => {
        const id = btn.parentElement.parentElement.id

        usable_data.forEach((task) => {
            if (task.id == id) {
                task.done = true
                localStorage.setItem('data', JSON.stringify(usable_data))
                window.location.reload()
            }
        })

    })

})
