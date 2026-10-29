

// call to apis to add data

document.addEventListener('DOMContentLoaded', () => {

    const add = document.getElementById("add")
    const update = document.getElementById("update")
    const del = document.getElementById("del")

    const add_form = document.getElementById("input_form")
    const update_form = document.getElementById("update_form")
    const del_form = document.getElementById("delete_form")

    const table = document.getElementById('DataTable')
    const noData = document.getElementById('noData')
    const tbody = document.getElementById('Tbody')

    //Switching between forms

    add.addEventListener("click", (e) => {
        e.preventDefault()
        add_form.style.display = 'flex'
        update_form.style.display = 'none'
        del_form.style.display = 'none'

    })

    update.addEventListener("click", (e) => {
        e.preventDefault()
        update_form.style.display = 'flex'
        add_form.style.display = 'none'
        del_form.style.display = 'none'

    })

    del.addEventListener("click", (e) => {
        e.preventDefault()
        del_form.style.display = 'flex'
        add_form.style.display = 'none'
        update_form.style.display = 'none'

    })

    //api call for fetching existing data
    async function loadData() {
        const request = await fetch('/api/loaddata')
        const data = await request.json()

        if (request.success === false) {
            table.style.display = 'none'
            noData.style.display = 'block'
        }
        else {

            tbody.innerHTML = ""

            data.forEach(student => {

                tbody.innerHTML += `
                    <tr>
                <td>${student.s_roll}</td>
                <td>${student.s_name}</td>
                </tr> `


            });


        }
    }

    loadData()

    //api call for adding record
    add_form.addEventListener('submit', async (e) => {

        e.preventDefault()

        const data = {
            s_roll: document.getElementById('addrollno').value,
            s_name: document.getElementById('addname').value
        }

        const request = await fetch('/api/addRecord', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)

        })

        const result = await request.json()

        alert(result.message)

        if (result.success) {
            add_form.reset()
            loadData()

        }


    })

    //api call for updating data
    update_form.addEventListener('submit', async (e)=>{
        e.preventDefault()

            const data = {
            s_roll: document.getElementById('update_roll_no').value,
            s_name: document.getElementById('update_name').value
        }

        const request = await fetch('/api/update' ,{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)

        }
        
    )
    
        const result = await request.json()

        alert(result.message)
    
        if(result.success){
            update_form.reset()
            loadData()
        }



    })

    //api call for deleting data
    del_form.addEventListener('submit', async (e)=>{
        e.preventDefault()

            const data = {
            s_roll: document.getElementById('del_roll_no').value
        }

        const request = await fetch('/api/delete' ,{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)

        }
        
    )
    
        const result = await request.json()

        alert(result.message)
    
        if(result.success){
            del_form.reset()
            loadData()
        }



    })



})