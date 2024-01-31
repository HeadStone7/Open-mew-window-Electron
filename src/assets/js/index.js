const electronApi = window.electronAPI

const btn = document.getElementById('btn')
console.log('before clicking')
btn.addEventListener('click',  () =>{
    console.log('after clicking')
    electronApi.openWindow('To main, open the window')

})
