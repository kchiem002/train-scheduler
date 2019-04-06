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
let trainName = document.querySelector('#input-train-name').value
let destination = document.querySelector('#input-destination').value
let startTime = document.querySelector('#input-train-time').value
let frequency = document.querySelector('#input-frequency').value

let unixCurrTime = moment().unix() / 60
let unixStartTime = moment(startTime).unix() / 60
let timeDiff = unixStartTime - unixCurrTime
let timeRemain = timeDiff % frequency
let untilArrival = frequency - timeRemain
let nextArrival = moment().add(untilArrival, "minutes").format("hh:mm")
let departTime = moment(startTime, 'hh:mm').unix()

// //calculate next arrival time
// const calcArrival = (depart, freq) => {
//     //convert departure and current time into unix minutes
//     departTime = moment(depart, 'HH:mm').unix() / 60
//     console.log(moment().format('hh:mm a'))

//     //if the departure time is later
//     // if (departTime > currTime)
//     //     let nextArr = moment(startTime).add(freq, 'minutes')
//     //     return moment(nextArrival).format('hh:mm a')
// }

document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    let id = db.collection('train').doc().id
    db.collection('train').doc().set({
        trainName: document.querySelector('#input-train-name').value,
        destination: document.querySelector('#input-destination').value,
        startTime: document.querySelector('#input-train-time').value,
        frequency: document.querySelector('#input-frequency').value,
    })
    trainName = document.querySelector('#input-train-name').value = ''
    destination = document.querySelector('#input-destination').value = ''
    startTime = document.querySelector('#input-train-time').value = ''
    frequency = document.querySelector('#input-frequency').value = ''
})

db.collection('train').onSnapshot(snap => {
    document.querySelector('#train-table').innerHTML = ''
    document.querySelector('#train-table').innerHTML = `
    <tr>
        <th>Train Name</th>
        <th>Destination</th>
        <th>Frequency</th>
        <th>Next Arrival</th>
        <th>Minutes Away</th>
    </tr>`

    snap.docs.forEach(doc => {
        let { trainName, destination, startTime, frequency } = doc.data()
        let docElem = document.createElement('tr')
        
        let startTimeConvert = moment(startTime, 'HH,mm').subtract(1, 'year')
        let currentTime = moment()

        let timeDifference = moment().diff(moment(startTimeConvert), 'minutes')
        let timeRemaining = timeDifference % frequency
        let minAway = frequency - timeRemaining

        let nextArrival = moment().add(minAway, 'minutes')

        docElem.innerHTML = `
            <td>${trainName}</td>
            <td>${destination}</td>
            <td>${frequency} Minutes</td>
            <td>${nextArrival} A.M.</td>
            <td>${minAway} Minutes</td>
            `
        document.querySelector('#train-table').appendChild(docElem)
    })

})

const displayTime = () => {
    document.querySelector('#display-current-time').innerHTML = `Current Time: ${moment().format('LTS')}`
}

setInterval(displayTime, 1000)
