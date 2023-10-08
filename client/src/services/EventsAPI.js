const renderItems = async () => {
    try{
        const response = await fetch('/events')
        const data = await response.json()
        console.log(response)
    } catch(err){
        console.log(err)
        console.log('hello')
    }

}

renderItems()