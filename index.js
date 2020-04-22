// Your code here

let createEmployeeRecord = function(row) { 
    return { 
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayOfArrays){ 
    return arrayOfArrays.map(function(array){ 
        return createEmployeeRecord(array)    
})
}

let createTimeInEvent = function(employeeRecord, dateStamp) { 
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
}



let createTimeOutEvent = function(employeeRecord, dateStamp) { 
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({ 
        type: "TimeOut", 
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
}

let hoursWorkedOnDate = function(employee, soughtDate) { 
    let inEvent = employee.timeInEvents.find(function(e) { 
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) { 
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(employee, soughtDate) { 
    // Using hoursWorkedOnDate, multiply the hours by the record's 
    //payRate to determine amount owed. Amount should be returned 
    //as a number.
    let payRate = employee.payPerHour

    return hoursWorkedOnDate(employee, soughtDate) * payRate
}

let allWagesFor = function(employee) { 
    let eligibleDates = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) { 
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
  }