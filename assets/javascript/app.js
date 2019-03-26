var config = {
    apiKey: "AIzaSyCsUJR25qFGIXciAZ07CzxBP1d0Y0lzSyc",
    authDomain: "train-scheduler-8926b.firebaseapp.com",
    databaseURL: "https://train-scheduler-8926b.firebaseio.com",
    projectId: "train-scheduler-8926b",
    storageBucket: "train-scheduler-8926b.appspot.com",
    messagingSenderId: "388241568589"
  };
  firebase.initializeApp(config);

let db = firebase.firestore()
let trainName
let destination
let frequency

document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    let id = db.collection('train').doc().id
    trainName = document.querySelector('#input-train-name').value
    destination = document.querySelector('#input-destination').value
    time = document.querySelector('#input-train-time').value
    frequency = document.querySelector('#input-frequency').value
    db.collection('train').doc().set({
        trainName: document.querySelector('#input-train-name').value,
        destination: document.querySelector('#input-destination').value,
        time: document.querySelector('#input-train-time').value,
        frequency: document.querySelector('#input-frequency').value,
    })
    trainName = document.querySelector('#input-train-name').value = ''
    destination = document.querySelector('#input-destination').value = ''
    time = document.querySelector('#input-train-time').value = ''
    frequency = document.querySelector('#input-frequency').value = ''
})

db.collection('train').onSnapshot(snap => {
    document.querySelector('#train-table').innerHTML = ''
    snap.docs.forEach(doc => {

        let { trainName, destination, time, frequency } = doc.data()
        let nextArrival = time
        let docElem = document.createElement('tr')
        docElem.innerHTML = `
            <td>${trainName}</td>
            <td>${destination}</td>
            <td>${frequency} Minutes</td>
            <td>${nextArrival} A.M.</td>
            `
        document.querySelector('#train-table').appendChild(docElem)
        console.log(docElem)
    })
})

